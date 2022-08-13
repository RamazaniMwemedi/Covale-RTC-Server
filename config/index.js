require("dotenv").config();

const PORT = process.env.PORT || 5000;
const USER_URI = process.env.MONGODB_URI;
const SECRETE = process.env.SECRETE;

console.log(`SECRETE: ${SECRETE}`);
module.exports = {
  PORT,
  USER_URI,
  SECRETE,
};
