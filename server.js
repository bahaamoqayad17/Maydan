const mongoose = require("mongoose");
const dotenv = require("dotenv");

const admin = require("firebase-admin");

const serviceAccount = require("./maydan-ce0df-firebase-adminsdk-p1aau-ebfbd3c400.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./.env" });
const app = require("./index.js");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://Maydan:cEGTA3UbUcmFQJzT@maydan.edatvha.mongodb.net/Maydan",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("App running on port " + port + "...");
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
