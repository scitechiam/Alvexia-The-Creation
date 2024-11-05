const User = require("../../../database/models/User.js");
const Character = require("../../../database/models/Character.js");

const JoinMap = require("../../world/worldEngine.js").joinMap;

const EVENT = "enterWorld";

const enterWorld = async (socket, io) => {
  socket.on(EVENT, async (data) => {
    try {
      const user = await User.findById(socket.user_id);

      if (!user) {
        socket.emit(EVENT, {status: "error" , message: "USER_NOT_FOUND" });
        return socket.disconnect();
      }
      
      const selected_char = data.selected_char;
      
      if(!selected_char){
        return socket.emit(EVENT,{status:"error" , message: "CHAR_NOT_SELECTED" }  );
      }

      const character = await Character.find({ user: user._id , _id: selected_char});
      
      if(!character) {
        return socket.emit(EVENT , {status: "error" , message: "CHAR_NOT_FOUND"});
      }
      
      socket.char_id = selected_char;
      
      await socket.emit("charData" , character);
      
      const map = await JoinMap(character.zone , character.coords , socket , io);

      socket.emit(EVENT, (map.status ? "JOINED_WORLD": map.message));
    } catch (error) {
      socket.emit(EVENT,{status: "error", message: "CANNOT_GET_CHARACTERS" } );
    }
  });
};

module.exports = enterWorld;
