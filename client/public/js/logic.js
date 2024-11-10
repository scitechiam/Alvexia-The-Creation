const initLogic = (()=> {
  const eng = new Engine("content");
  const event = new EngineEvent(eng);
  const BLOCK = eng.BLOCK_LENGTH * 3;
  const floor = new Floor(eng, {
    W: BLOCK, H: BLOCK,
    src: "/assets/grass01.png"
  })
  const textures = [];
  const player = new Sprite( {
    id: "player",
    W: eng.BLOCK *3, H: eng.BLOCK * 3,
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
  })
  const tree = new Texture( {
    id: "tree1",
    W: eng.BLOCK, H: eng.BLOCK,
    src: "/assets/tree01.png"
  })
  textures.push(tree)
  textures.push(player)
  createEnemy(50)
  createAnimals(20)
  createBiomass(80)
  floor.elements = getOrder(textures);
  const textCoord = new Text( {
    x: 10,
    y: 80
  })
  let render = ()=> {
    try {
      eng.begin(render, true);
      floor.draw(true, player);
      textCoord.text = "C:" +Math.floor(floor.x/eng.BLOCK) * -1 + ", "+ Math.floor(floor.y/eng.BLOCK) * -1;
      textCoord.draw(eng.ctx)
      eng.updateFPS();
    }catch(e) {
      console.log(e)
      render = ()=> {};
    }
  };
  event.OnAll(function(ev) {
    floor.toward.x = ev.x;
    floor.toward.y = ev.y;
  });
  function createBiomass(number) {
    var imagesType = [
      "/assets/tree01.png",
      "/assets/tree02.png",
      "/assets/fruit_tree01.png",
    ];
    for (var i = 0; i < number; i++) {
      var indexTree = imagesType[Math.floor(Math.random() * imagesType.length)];
      var size = (Math.floor(Math.random() * 100)) + 100;
      textures.push(createElement(indexTree, size));
      for (var im = 0; im < 5; im++) {
        textures.push(createElement("/assets/grass_high01.png", 50));
      }
      if (i < number/ 3) {
        textures.push(createElement("/assets/trunk01.png", size / 2));
        textures.push(createElement("/assets/flower01.png", size / 5));
        textures.push(createElement("/assets/flower02.png", size / 5));
        textures.push(createElement("/assets/flower03.png", size / 5));
        textures.push(createElement("/assets/flower04.png", size / 5));
        textures.push(createElement("/assets/flower05.png", size / 5));

      }
      if (i < number / 4) {
        textures.push(createElement("/assets/stone01.png", size / 5))
      }
    }
  }
  var count_elements = 0;
  function createElement(src, size) {
    count_elements += 1;
    return new Texture( {
      x: Math.floor(Math.random()*floor.L_W),
      y: Math.floor(Math.random()*floor.L_H),
      id: "fauna_" + count_elements,
      src: src,
      W: size, H: size
    });
  }
  function createEnemy(number) {
    if (number == null) return;
    for (var i = 0; i < number; i++) {
      textures.push(new Sprite( {
        x: (Math.floor(Math.random() * floor.L_W)),
        y: (Math.floor(Math.random() * floor.L_H)),
        id: "skeleton_" + i,
        src: "/assets/sheet_skeleton01.png", isAutoMove: true,
        speed: 3, floor: floor,
        animation: {
          frameX: listFrame(9), frameY: listFrame(4),
          scale: 1.5,
          run: {
            left: x_y(8, 3), right: x_y(8, 1),
            top: x_y(8, 0), bottom: x_y(8, 2)
          },
          stop: {
            left: x_y(0, 3), right: x_y(0, 1),
            top: x_y(0, 0), bottom: x_y(0, 2)
          },
        }
      }));
    }
  }
  function createAnimals(number) {
    if (number == null) return;
    var _animals = {
      dog: x_y(0, 0),
      gat: x_y(3, 0),
      chicken: x_y(6, 0),
      horse: x_y(9, 0),
      sheep: x_y(0, 4),
      cow: x_y(3, 4),
      deer: x_y(6, 4),
      cabra: x_y(9, 4),
    }
    var obj = Object.keys(_animals);
    for (var iN = 0; iN < obj.length; iN++) {
      for (var i = 0; i < number; i++) {
        textures.push(new Sprite( {
          x: (Math.floor(Math.random() * floor.L_W)),
          y: (Math.floor(Math.random() * floor.L_H)),
          id: "animal_" + i,
          src: "/assets/sheet_animals01.png",
          isAutoMove: true,
          speed: 2, floor: floor,
          animation: {
            x: _animals[obj[iN]].x, y: _animals[obj[iN]].y,
            frameX: listFrame(12), frameY: listFrame(8),
            scale: 1.5,
            run: {
              left: x_y(2, 2), right: x_y(2, 1),
              top: x_y(2, 3), bottom: x_y(2, 0)
            },
            stop: {
              left: x_y(0, 2), right: x_y(0, 1),
              top: x_y(0, 3), bottom: x_y(1, 0)
            },
          }
        }));
      }
    }
  }
  render();
});