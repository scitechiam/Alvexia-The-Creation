const charCreation = require("./socket/charCreation/charCreation.js");
const world = require("./world/world.js");

module.exports = (socket, io) => {
  charCreation(socket, io);
  world(socket , io);
};
