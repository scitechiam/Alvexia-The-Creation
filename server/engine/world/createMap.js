const { SERVER } = require("../../../config.js");
const User = require(SERVER + "/database/models/User.js");
const Character = require(SERVER + "/database/models/Character.js");
const CreateMap = require("./worldEngine.js").createMap;

const EVENT = "createMap";

const createMap = async (socket, io) => {
  socket.on(EVENT, async (data) => {
    try {
      const user = await User.findById(socket.user_id);

      if (!user) {
        socket.emit(EVENT, {status: "error" , message: "USER_NOT_FOUND"});
        return socket.disconnect();
      }
      
      if(user.acclevel < 2) {
        socket.emit(EVENT , {status: "error" , message: "NOT_ENOUGHT_PRIVILEGES"});
        return socket.disconnect();
      }
      
      const map = CreateMap(data.name , data.x , data.y , data.size_x , data.size_y);
      
      socket.emit(EVENT , map);
      
    } catch (error) {
      console.error("Error al crear mapa:", error);
      socket.emit(EVENT, {status: "error" , message: "CANNOT_CREATE_MAP"});
    }
  });
};

module.exports = createMap;

