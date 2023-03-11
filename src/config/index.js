import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

let envFound;
if (process.env.NODE_ENV !== "prod") {
  envFound = dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
}

export const port = parseInt(process.env.PORT, 10) || 3000;
export const databaseURL = process.env.MONGODB_URI;
export const jwtSecret = process.env.JWT_SECRET;
export const baseUrl = process.env.BASE_URL;
export const emailTest = process.env.EMAIL_TEST;
export const emailTestAppPswd = process.env.EMAIL_TEST_APP_PSWD;
export const cloudName = process.env.CLOUD_NAME;
export const apiKey = process.env.API_KEY;
export const api_secret = prccess.env.API_SECRET;

export default {
  port: parseInt(process.env.PORT, 10) || 8001,
  databaseURL: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  emailTest: process.env.EMAIL_TEST,
  emailTestAppPswd: process.env.EMAIL_TEST_APP_PSWD,
  cloudName: process.env.CLOUD_NAME,
  apiKey: process.env.API_KEY,
  api_secret: prccess.env.API_SECRET,
  api: {
    prefix: "/api/v1",
  },
};
