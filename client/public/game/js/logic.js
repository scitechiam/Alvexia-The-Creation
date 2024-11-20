module.exp.logic = ((socket)=> {
  const save_local = require("save_local");
  const character = require("character");
  const eng = new Engine("content");
  const floor = new Floor(eng, {
    W: 99, H: 99,
    src: "/assets/grass01.png"
  });
  const player = new Texture(); /*new Sprite( {
    id: "player",
    x: 200, y: 200,
    W: eng.BLOCK * 3, H: eng.BLOCK * 3,
    src: "/assets/sheet_player01.png",
    speed: 5, floor: floor,
    animation: {
      frameX: listFrame(10), frameY: listFrame(8), scale: 1.5,
      run: {
        left: x_y(9, 7), right: x_y(9, 5),
        top: x_y(9, 6), bottom: x_y(9, 4)
      },
      stop: {
        left: x_y(2, 1), right: x_y(2, 3),
        top: x_y(0, 2), bottom: x_y(2, 0)
      },
    }
  })*/
  const textName = new Text( {

    /*  x: playerValues.x, y: playerValues.y*/
  })
  let creatures = {};
  floor.elements.push(player);
  socket.emit("enterWorld", {
    selected_char: env.id
  });
  const log = new Text( {
    x: eng.C_X,
    y: eng.C_Y
  })
  let render = ()=> {
    try {
      eng.begin(render, true);
      floor.draw(true, player); // player); //player);
      textName.x = player.x - player.W;
      textName.y = player.y - player.H;
      textName.draw(eng.ctx);
      log.text = player.coordinates.x +"/"+player.coordinates.y
      log.draw(eng.ctx)
    }catch(e) {
      console.log(e);
      render = ()=> {};
    }
  }
  floor.toward.x = 200;
  floor.toward.y = 200;
  eng.event.on("all", (ev)=> {
    floor.toward.x = player.x = ev.x;
    floor.toward.y = player.y = ev.y;
    socket.emit("moves", {
      x: (floor.x)*-1,
      y: (floor.y) * -1
    })

  });
  socket.on("enterWorld", (data)=> {
    console.log("enterWorld", data);
  });
  socket.on("getMap", (data)=> {
    console.log("getMap", data);
    try {
      creatures = data.pjs;
      // console.log(JSON.stringify(creatures))
      for (let i in creatures) {
        // console.log(creatures[i])
        if (i != env.id) {
          /* let char = character(eng, creatures[i].skin);
          char.animation.scale = 1.5;
          char.speed = 5;
          char.floor = floor;
          char.x = 200; //creatures[i].coords.x;
          char.y = 200; // creatures[i].coords.y;
          char.id = i;/**/
          floor.elements.push(new Texture( {
            id: i
          }));
        }
      }
    }catch(e) {
      console.log(e)
    }
  });
  socket.on("charData",
    (data)=> {
      textName.text = data.name;
      console.log("charData", data);
    });
  socket.on("newPj",
    (data)=> {
      console.log("newPj", data)
      /*  creatures = data;
      for (let i in creatures) {
        let char = character(eng, creatures[i].skin);
        char.animation.scale = 1.5;
        char.floor = floor;
        char.speed = 5;
        char.x = creatures[i].coords.x;
        char.y = creatures[i].coords.y;
        char.id = i;
        floor.elements.push(new Sprite(char));
      }*/
    });
  socket.on("moves",
    (data)=> {
      console.log("moves", JSON.stringify(data));
      for (let i in data) {
        let index = floor.index(i);
        if (index == -1) return;
        // floor.elements[index].coordinates = data[i].moveTo;
        //   floor.elements[index].move(data[i].moveTo)
        floor.elements[index].x = data[i].moveTo.x
        floor.elements[index].y = data[i].moveTo.y/**/
      }
    });
  socket.on("delPj",
    (data)=> {
      console.log("delPj", data);
    });

  render();
});