const router = require("express").Router();
const news = require("./news.js");

router.get('/news' , news);

module.exports = router;