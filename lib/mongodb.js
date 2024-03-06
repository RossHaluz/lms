import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_URL;

const connect = async () => {
  try {
    mongoose.connect(MONGODB_URI);
    console.log("Connected");
  } catch (error) {
    console.log("Error in connecting to database", error);
    throw new Error("Error connecting to database");
  }
};

export default connect;
