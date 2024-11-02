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

      const characters = await Character.find({user : user._id}).populate("user");

      socket.emit(EVENT, characters);
    } catch (error) {
      socket.emit("error", "CANNOT_GET_CHARACTERS" );
    }
  });
};

module.exports = getCharacters;
