const fs = require("fs");
const { SERVER } = require("../../../config.js");

const news = async (req, res) => {
  const newsRoute = `${SERVER}/database/extras/news.json`;

  fs.readFile(newsRoute, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer archivo:", err);
      return res.json({ status :  "error" , message: "ERROR_READING_FILE" });
    }

    try {
      // Parsear el JSON y enviarlo en la respuesta
      const newsData = JSON.parse(data);
      res.json({status: "success" , message: newsData});
    } catch (parseError) {
      console.error("Error al parsear JSON:", parseError);
      return res.json({ status :  "error" , message: "ERROR_PARSING_FILE" });
    }
  });
};

module.exports = news;