const User = require("../../database/models/User.js");
const Character = require("../../database/models/Character.js");

const EVENT = "createCharacter";

const createCharacter = async (socket, io) => {
  socket.on(EVENT, async (data) => {
    try {
      const user = await User.findById(socket.user_id);

      if (!user) {
        socket.emit("error", { message: "USER_NOT_FOUND" });
        return socket.disconnect();
      }

      if (!data.name || data.name.length < 4)
        return socket.emit(EVENT, "NAME_LENGTH_MIN");
      if (data.name.length > 14)
        return socket.emit(EVENT, "NAME_LENGTH_MAX");

      const charName = await Character.find({ name: data.name });
      if (charName.length > 0)
        return socket.emit(EVENT, "NAME_EXISTS");

      // Crear un nuevo personaje para este usuario
      const newCharacter = new Character({
        user: user._id, // Relaciona el personaje con el usuario
        name: data.name, // Puedes recibir el nombre desde el cliente
        skin: data.skin || "hero_1",
      });

      // Guardar el personaje en la base de datos
      const savedCharacter = await newCharacter.save();

      // Emitir un evento al cliente indicando que se creó el personaje
      socket.emit(EVENT, savedCharacter);
    } catch (error) {
      console.error("Error al crear personaje:", error);
      socket.emit("error", { message: "No se pudo crear el personaje" });
    }
  });
};

module.exports = createCharacter;
