const charCreation = require("./socket/charCreation/charCreation.js");

module.exports = (socket, io) => {
  charCreation(socket, io);
};
