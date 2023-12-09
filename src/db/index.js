import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_CON);
    console.log(
      `Database connected || Connected host : ${connection.connection.host}`
    );
  } catch (error) {
    console.log("Database Connection Error");
    throw error;
    process.exit(1);
  }
};

export default connectDB;
