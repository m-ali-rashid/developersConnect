const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

//Connecting to mongodb
//.connect will return a promise so we can use .then .catch syntax but async await is new standard and we will use it

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
