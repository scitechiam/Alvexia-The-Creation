const User = require("../../database/models/User.js");
const Character = require("../../database/models/Character.js");

const EVENT = "getCharacters";

const getCharacters = async (socket, io) => {
  socket.on(EVENT, async (data) => {
    try {
      const user = await User.findById(socket.user_id);

      if (!user) {
        socket.emit("error", { message: "USER_NOT_FOUND" });
        return socket.disconnect();
      }

      const characters = await Character.find({user_id : user._id});

      socket.emit(EVENT, characters);
    } catch (error) {
      socket.emit("error", { message: "No se pudo crear el personaje" });
    }
  });
};

module.exports = getCharacters;
