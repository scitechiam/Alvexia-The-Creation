const {movePj} = require("../../world/worldEngine.js");
const EVENT = "move";

const move = async (socket, io) => {
  socket.on(EVENT, async (data) => {
    movePj(socket , data.x , data.y);
  });
};

module.exports = move;