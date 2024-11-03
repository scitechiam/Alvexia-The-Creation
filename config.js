
require("dotenv").config();

module.exports = {
  LANGUAGES: ["en", "es"],
  SECRET_TOKEN: process.env.SECRET_TOKEN || "supersecrettoken",
  MONGO_URI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}`,
  SERVER_PORT: process.env.PORT || 3000,
  CLIENT: __dirname + '/client',
  SERVER: __dirname + '/server'
}