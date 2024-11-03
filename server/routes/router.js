const router = require("express").Router();
const auth = require("./auth/router");
const news = require("./news/news.js");

router.use('/auth', auth);
router.use(news);

module.exports = router;