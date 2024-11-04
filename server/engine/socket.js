const charCreation = require("./socket/charCreation/charCreation.js");
const world = require("./socket/world/world.js");

module.exports = (socket, io) => {
  charCreation(socket, io);
  world(socket , io);
};
