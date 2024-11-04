const character = (event, socket, callback)=> {
  socket.on(event, async(data)=> {
    try {
      let res = JSON.parse(data);
      callback(true, res)
    } catch(e) {
      callback(false, data)
    }
  })
}