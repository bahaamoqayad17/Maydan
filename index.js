const express = require("express");
const app = express();
const morgan = require("morgan");
const GlobalErrorHandler = require("./Controllers/ErrorHandler");
const cors = require("cors");
const AppError = require("./utils/AppError");
const path = require("path");
const ApplicationRouter = require("./Routes/ApplicationRouter");
const MessageRouter = require("./Routes/MessageRouter");
const AdRouter = require("./Routes/AdRouter");
const SettingRouter = require("./Routes/SettingRouter");
const CategoryRouter = require("./Routes/CategoryRouter");
const UserRouter = require("./Routes/UserRouter");
const AuthRouter = require("./Routes/AuthRouter");
var admin = require("firebase-admin");

const serviceAccount = require("./maydan-ce0df-firebase-adminsdk-p1aau-ebfbd3c400.json");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,POST,DELETE",
  })
);

app.use(morgan("combined"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static(path.join(__dirname, "public")));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use("/api/applications", ApplicationRouter);
app.use("/api/messages", MessageRouter);
app.use("/api/ads", AdRouter);
app.use("/api/settings", SettingRouter);
app.use("/api/categories", CategoryRouter);
app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);

app.all("*", (req, res, next) => {
  next(new AppError("Can't find " + req.originalUrl + " on this server", 404));
});

app.use(GlobalErrorHandler);

module.exports = app;
