module.exp.game = ((socket, map, creature)=> {
  const content = getById("content");
  const character = require('character');
  content.innerText = "";
  const eng = new Engine("content");
  const world = map.world;
  const textures = [];
  const playerValues = character(eng, creature.skin);
  playerValues.x = creature.x;
  playerValues.y = creature.y;
  const player = new Sprite(playerValues);
  const floor = new Floor(eng, {
    W: world.size_x, H: world.size_y,
    src: "/assets/grass01.png"
  });
  const textName = new Text( {
    text: creature.name,
    x: playerValues.x, y: playerValues.y
  })
  textures.push(player);
  floor.elements = getOrder(textures);
  socket.emit("newPj");
  let render = ()=> {
    try {
      eng.begin(render, true);
      floor.draw(true, player);
      textName.x = player.x - player.W;
      textName.y = player.y - player.H;
      socket.emit("move", {
        x: Math.floor(floor.x / eng.BLOCK) * -1,
        y: Math.floor(floor.y / eng.BLOCK) * -1
      })
      textName.draw(eng.ctx);
    }catch(e) {
      console.log(e);
      render = ()=> {}
    }
  };
  eng.event.on("all", (ev)=> {
    floor.toward.x = ev.x;
    floor.toward.y = ev.y;
  });
  socket.on('move', (data)=> {
    console.log("move", data)
  })
  socket.on('newPj', (data)=> {
    console.log("newPj", data)
  })
  socket.on('pjMove', (data)=> {
    console.log("pjMove", data)
  })
  socket.on('error', (data)=> {
    console.log("error", data)
  })
  render();
})