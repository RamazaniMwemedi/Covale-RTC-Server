require("dotenv").config();

const PORT = process.env.PORT || 5055;
const getDBURI = (envMode) => {
  switch (envMode) {
    case "development":
      return process.env.MONGODB_URI;
    case "production":
      return process.env.DEV_MONGODB_URI;

    case "test":
      return process.env.TEST_MONGODB_URI;
    default:
      return process.env.DEV_MONGODB_URI;
  }
};
const USER_URI = getDBURI(process.env.NODE_ENV);
const SECRETE = process.env.SECRETE;

const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;
const BUCKET_ACCESS_KEY = process.env.BUCKET_ACCESS_KEY;
const BUCKET_SECRETE_KEY = process.env.BUCKET_SECRETE_KEY;

console.log(`SECRETE: ${SECRETE}`);
module.exports = {
  PORT,
  USER_URI,
  SECRETE,
  BUCKET_NAME,
  BUCKET_REGION,
  BUCKET_ACCESS_KEY,
  BUCKET_SECRETE_KEY,
};
