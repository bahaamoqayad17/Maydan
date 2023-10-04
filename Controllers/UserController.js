const factory = require("./FactoryHandler");
const User = require("../Models/User");
const CatchAsync = require("../utils/CatchAsync");
const multer = require("multer");
const fs = require("fs");
const admin = require("firebase-admin");
const db = admin.firestore();

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype === "image/*") {
    cb(null, true);
  } else {
    cb(new AppError("Invalid file type! Please upload only PDFs.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single("avatar");

exports.uploadFile = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return next(err);
    }
    next();
  });
};

exports.saveFile = CatchAsync(async (req, res, next) => {
  if (req.file) {
    const pdfFileName = `avatar-${Date.now()}.jpg`;
    const pdfFilePath = `public/${pdfFileName}`;

    fs.writeFileSync(pdfFilePath, req.file.buffer);

    req.body.avatar = pdfFileName;
  } else {
    delete req.body.avatar;
  }

  next();
});

exports.index = factory.index(User);
exports.create = factory.create(User);
exports.show = factory.show(User);
exports.update = factory.update(User);
exports.delete = factory.delete(User);

exports.notifications = CatchAsync(async (req, res, next) => {
  const response = await db
    .collection("notifications")
    .where("user", "==", JSON.stringify(req.user))
    .get();

  const data = [];
  response.forEach((doc) => {
    const notificationData = doc.data();
    if (typeof notificationData.user === "string") {
      notificationData.user = JSON.parse(notificationData.user);
    }
    if (typeof notificationData.application === "string") {
      notificationData.application = JSON.parse(notificationData.application);
    }
    if (typeof notificationData.ad === "string") {
      notificationData.ad = JSON.parse(notificationData.ad);
    }
    data.push(notificationData);
  });

  res.status(200).json({
    status: "success",
    data,
  });
});

exports.deleteMe = CatchAsync(async (req, res, next) => {
  await User.findByIdAndRemove(req.user._id);

  res.status(204).json({
    status: "success",
    data: "Deleted Successfully",
  });
});

exports.updateMe = CatchAsync(async (req, res, next) => {
  const {
    name,
    mobile_number,
    address,
    description,
    facebook,
    insta,
    twitter,
    work_time,
    work_hours,
  } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      mobile_number,
      address,
      description,
      facebook,
      insta,
      twitter,
      work_time,
      work_hours,
    },
    { new: true, runValidators: false }
  );

  res.status(204).json({
    status: "success",
    user,
  });
});
