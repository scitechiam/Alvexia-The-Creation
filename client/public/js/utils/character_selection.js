module.exp.character_preview = ((eng, player)=> {
  let moveTo = 0;
  let cord = {
    x: eng.W / 2, y: eng.H /2
  }
  eng.event.on("click", ()=> {
    moveTo = moveTo >= 3? 0: moveTo+1;
    switch (moveTo) {
      case 0:
        player.direction = "bottom"
        break;
      case 1:
        player.direction = "left"
        break;
      case 2:
        player.direction = "top"
        break;
      case 3:
        player.direction = "right"
        break;
    }
  });
  let render = ()=> {
    try {
      eng.begin(render, true);
      player.draw(eng.ctx);
      player.move(cord, true);
    }catch(e) {
      console.log(e);
      render = function() {};
    }
  }
  render();
});
module.exp.character = ((eng, val)=> {

  // console.log(val)
  let characters = {
    elf: {
      x: eng.C_X,
      y: eng.C_Y,
      src: "/assets/sheet_player01.png",
      speed: 5,
      animation: {
        frameX: listFrame(10),
        frameY: listFrame(8),
        scale: 1.9,
        run: {
          left: x_y(9, 7),
          right: x_y(9, 5),
          top: x_y(9, 6),
          bottom: x_y(9, 4)
      },
      stop: {
        left: x_y(2, 1),
        right: x_y(2, 3),
        top: x_y(0, 2),
        bottom: x_y(2, 0)
      },
    }
  },
  orc: {
    x: eng.C_X,
    y: eng.C_Y,
    src: "/assets/sheet_skeleton01.png",
    speed: 3,
    animation: {
      frameX: listFrame(9),
      frameY: listFrame(4),
      scale: 1.9,
      run: {
        left: x_y(8, 3),
        right: x_y(8, 1),
        top: x_y(8, 0),
        bottom: x_y(8, 2)
      },
      stop: {
        left: x_y(0, 3),
        right: x_y(0, 1),
        top: x_y(0, 0),
        bottom: x_y(0, 2)
      },
    }
  }
};
  if (characters[val] != null) {
    return characters[val];
  } else {
    console.error(`La raza "${val}" no existe o no fue programado.`)
    return {};
  }
  });