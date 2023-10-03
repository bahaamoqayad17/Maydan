const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../Models/User");

const Application = require("./../models/Application") 
const Message = require("./../models/Message") 
const Ad = require("./../models/Ad") 
const Setting = require("./../models/Setting") 
const Category = require("./../models/Category")

dotenv.config({ path: "./.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful!"));

const applications = JSON.parse(fs.readFileSync(__dirname+"/applications.json", "utf-8")); 
const messages = JSON.parse(fs.readFileSync(__dirname+"/messages.json", "utf-8")); 
const ads = JSON.parse(fs.readFileSync(__dirname+"/ads.json", "utf-8")); 
const settings = JSON.parse(fs.readFileSync(__dirname+"/settings.json", "utf-8")); 
const categories = JSON.parse(fs.readFileSync(__dirname+"/categories.json", "utf-8"));
const users = JSON.parse(fs.readFileSync(__dirname+"/users.json", "utf-8"));


// IMPORT DATA INTO DB
const importData = async () => {
  try {
await Application.create(applications) 
await Message.create(messages) 
await Ad.create(ads) 
await Setting.create(settings) 
await Category.create(categories)
    await User.create(users, { validateBeforeSave: false });
    console.log("Data Successfully Inserted !");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    
await Application.deleteMany() 
await Message.deleteMany() 
await Ad.deleteMany() 
await Setting.deleteMany() 
await Category.deleteMany()
    await User.deleteMany();
    console.log("Data Successfully Deleted !");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--seed") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
