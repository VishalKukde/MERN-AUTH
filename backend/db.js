require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  const MONGO_URIS = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(MONGO_URIS, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
