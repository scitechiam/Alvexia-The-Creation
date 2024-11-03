const createMap = require("./createMap.js");

module.exports = (socket, io) => {
  createMap(socket, io);
};
