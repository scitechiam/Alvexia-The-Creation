const charCreation = require("./socket/charCreation/charCreation.js");
const world = require("./socket/world/world.js");
const controller = require("./socket/controller/controller.js")

module.exports = (socket, io) => {
  charCreation(socket, io);
  world(socket , io);
  controller(socket , io);
};
