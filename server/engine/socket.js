const createCharacter = require("./socket/createCharacter.js");

module.exports = (socket ,io) => {
  createCharacter(socket , io);
};
