const createCharacter = require("./createCharacter.js");
const getCharacters = require("./getCharacters.js");

module.exports = (socket, io) => {
  createCharacter(socket, io);
  getCharacters(socket, io);
};
