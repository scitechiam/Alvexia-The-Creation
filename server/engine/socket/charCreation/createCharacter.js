const User = require("../../../database/models/User.js");
const Character = require("../../../database/models/Character.js");

const EVENT = "createCharacter";

const createCharacter = async (socket, io) => {
  socket.on(EVENT, async (data) => {
    try {
      const user = await User.findById(socket.user_id);

      if (!user) {
        socket.emit(EVENT, "USER_NOT_FOUND");
        return socket.disconnect();
      }

      if (!data.name || data.name.length < 4)
        return socket.emit(EVENT, "NAME_LENGTH_MIN");
      if (data.name.length > 14) return socket.emit(EVENT, "NAME_LENGTH_MAX");

      const charName = await Character.find({ name: data.name });
      if (charName.length > 0) return socket.emit(EVENT, "NAME_EXISTS");

      const totalChars = await Character.find({ user: user._id });

      // Corrección: uso de length para verificar el total de personajes
      if (totalChars.length >= 3 && user.vip === false)
        return socket.emit(EVENT, "MAXIMUM_CHARACTERS");
      if (totalChars.length >= 5) return socket.emit(EVENT, "CHARACTERS_LIMIT");

      // Crear un nuevo personaje para este usuario
      const newCharacter = new Character({
        user: user._id,
        name: data.name,
        race: data.race,
        zone: {x: 0 , y : 0},
        skin: data.skin || `${data.race}_1`,
      });

      // Guardar el personaje en la base de datos
      const savedCharacter = await newCharacter.save();

      // Emitir un evento al cliente indicando que se creó el personaje
      socket.emit(EVENT, savedCharacter);
    } catch (error) {
      console.error("Error al crear personaje:", error);
      socket.emit(EVENT, "CANNOT_CREATE_CHARACTER");
    }
  });
};

module.exports = createCharacter;
