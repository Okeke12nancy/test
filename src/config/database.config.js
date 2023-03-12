import mongoose from "mongoose";
import config from "../config/index.js";

mongoose.set("strictQuery", false);

export const connectDB = async () => {
  await mongoose
    .connect(config.databaseURL, {})
    .then(() => {
      console.log("DB connection successful!");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const disconnectDB = async () => {
  return await mongoose.disconnect();
};

export default {
  connectDB,
  disconnectDB,
};
