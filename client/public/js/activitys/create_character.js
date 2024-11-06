const CreateCharacter = ((socket, eng)=> {
  let race = "elf";
  //const content_create_character = getById("content_create_character");
  const name_character = getById("input_name_character");
  getById("btn_create_character").onclick = ()=> {
    let data = {
      name: name_character.innerText.trim(),
      race,
    }
    if (!isNaN(data.name)) return show("Ponle nombre al personaje");
    socket.emit("createCharacter", data);
  }


  /* eng.canvas.style.width = "100px"
  eng.canvas.style.height = "100px"*/
  let player = new Sprite( {
    id: "playejdjr",
    x: eng.W/2, y: eng.H/2,
    src: "/assets/sheet_player01.png",
    speed: 5,
    animation: {
      frameX: listFrame(10), frameY: listFrame(8), scale: 1.9,
      run: {
        left: x_y(9, 7), right: x_y(9, 5),
        top: x_y(9, 6), bottom: x_y(9, 4)
      },
      stop: {
        left: x_y(2, 1), right: x_y(2, 3),
        top: x_y(0, 2), bottom: x_y(2, 0)
      },
    }
  });
  let moveTo = 0;
  eng.event.on("click", ()=> {
    //  alert("jdj")
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
      player.move({
        x: eng.W/2, y: eng.H/2
    }, true);
    //  console.log("js")
  }catch(e) {
    console.log(e)
    render = function() {};
  }
}

  document.getElementById("btn_select_elfo").onclick = ()=> {
    race = "elf"
    player = new Sprite( {
      id: "player",
      x: eng.W/2, y: eng.H/2,
      src: "/assets/sheet_player01.png",
      speed: 5,
      animation: {
        frameX: listFrame(10), frameY: listFrame(8), scale: 1.9,
        run: {
          left: x_y(9, 7), right: x_y(9, 5),
          top: x_y(9, 6), bottom: x_y(9, 4)
      },
      stop: {
        left: x_y(2, 1), right: x_y(2, 3),
        top: x_y(0, 2), bottom: x_y(2, 0)
      },
    }
    });
}
document.getElementById("btn_select_ogro").onclick = ()=> {
  race = "ogro"
  player = new Sprite( {
    x: eng.W/2, y: eng.H/2,
    id: "skeleton",
    src: "/assets/sheet_skeleton01.png",
    speed: 3,
    animation: {
      frameX: listFrame(9), frameY: listFrame(4),
      scale: 1.9,
      run: {
        left: x_y(8, 3), right: x_y(8, 1),
        top: x_y(8, 0), bottom: x_y(8, 2)
      },
      stop: {
        left: x_y(0, 3), right: x_y(0, 1),
        top: x_y(0, 0), bottom: x_y(0, 2)
      },
    }
  });
}
render();

});