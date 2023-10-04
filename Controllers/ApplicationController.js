const factory = require("./FactoryHandler");
const Application = require("../Models/Application");
const CatchAsync = require("../Utils/CatchAsync");
const multer = require("multer");
const fs = require("fs");
const Ad = require("../Models/Ad");
const admin = require("firebase-admin");
const AppError = require("../Utils/AppError");
const db = admin.firestore();

exports.index = factory.index(Application);
exports.create = CatchAsync(async (req, res, next) => {
  const app = await Application.findOne({
    user: req.user._id,
    ad: req.body.ad,
  });

  if (app) {
    return next(new AppError("You have already applied for this job", 400));
  }

  const data = await Application.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data,
  });
});

exports.show = factory.show(Application);
exports.update = factory.update(Application);
exports.delete = factory.delete(Application);

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new AppError("Invalid file type! Please upload only PDFs.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single("resume");

exports.uploadFile = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return next(err);
    }
    next();
  });
};

exports.savePDF = CatchAsync(async (req, res, next) => {
  if (req.file) {
    const pdfFileName = `document-${Date.now()}.pdf`;
    const pdfFilePath = `public/${pdfFileName}`;

    fs.writeFileSync(pdfFilePath, req.file.buffer);

    req.body.resume = pdfFileName;
  } else {
    delete req.body.resume;
  }

  next();
});

exports.updateStatus = CatchAsync(async (req, res, next) => {
  const { status, ad } = req.body;
  const application = await Application.findOneAndUpdate(
    { user: req.user._id, ad },
    { status },
    { new: true }
  );

  const advir = await Ad.findById(ad);

  let notificationMessage = {};

  if (status === 1) {
    notificationMessage = {
      title: "Application Accepted",
      body: "Your application has been accepted. Come to our office for further process.",
    };
  } else if (status === 2) {
    notificationMessage = {
      title: "Application Rejected",
      body: "Your application has been rejected.",
    };
  }

  const message = {
    notification: notificationMessage,
    token: req.user.fcm_token,
  };

  await admin.messaging().send(message);

  const notificationData = {
    user: JSON.stringify(req.user),
    ad: aJSON.stringify(advir),
    application: JSON.stringify(application),
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  };

  const data = await db.collection("notifications").add(notificationData);

  res.status(200).json({
    status: "success",
    message: "Status Updated Successfully",
    data,
  });
});
