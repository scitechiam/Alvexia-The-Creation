const createCharacter = require("./socket/createCharacter.js");
const getCharacters = require("./socket/getCharacters.js");

module.exports = (socket ,io) => {
  createCharacter(socket , io);
  getCharacters(socket , io);
};
