const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const CatchAsync = require("../Utils/CatchAsync");
const AppError = require("../Utils/AppError");
const bcrypt = require("bcryptjs");
const SendEmail = require("../Utils/SendEmail");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.register = CatchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    category: req.body.category,
    mobile_number: req.body.mobile_number,
    address: req.body.address,
    description: req.body.description,
    facebook: req.body.facebook,
    insta: req.body.insta,
    twitter: req.body.twitter,
    work_time: req.body.work_time,
    work_hours: req.body.work_hours,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(user, 201, req, res);
});

exports.login = CatchAsync(async (req, res, next) => {
  const { email, password, fcm_token } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await User.findOneAndUpdate({ email }, { fcm_token }).select(
    "+password"
  );

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, req, res);
});
0;

exports.protect = CatchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

const resetTokens = {};

exports.forgetPassword = CatchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const code = String(Math.floor(Math.random() * 9999));

  resetTokens[email] = {
    code,
    timestamp: Date.now(),
  };

  await SendEmail(email, "Password Reset Code", `Your code is: ${code}`);

  res.status(200).json({ message: `Code sent successfully` });
});

exports.verifyCode = CatchAsync(async (req, res, next) => {
  const { email, code } = req.body;
  const resetData = resetTokens[email];

  if (!resetData) {
    return res.status(404).json({ message: "Reset data not found" });
  }

  const { code: storedCode, timestamp } = resetData;

  if (code !== storedCode || Date.now() - timestamp > 90000) {
    return res.status(400).json({
      message: {
        en: "Invalid code Or Exipred code",
        ar: "كود غير صحيح أو منتهي الصلاحية",
      },
    });
  }

  res.status(200).json({ message: "Code verified successfully" });
});

exports.resetPassword = CatchAsync(async (req, res, next) => {
  const { email, newPassword } = req.body;
  const user = await User.findOneAndUpdate(
    { email },
    {
      password: await bcrypt.hash(newPassword, 12),
    }
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.password = newPassword;

  delete resetTokens[email];

  res.status(200).json({ message: "Password reset successful" });
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
