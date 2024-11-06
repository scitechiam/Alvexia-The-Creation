const enterWorld = require("./enterWorld.js");
const move = require("./move.js");

module.exports = (socket, io) => {
  enterWorld(socket, io);
  move(socket, io);
};
