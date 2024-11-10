module.exp.create_character_page = ((socket)=> {
  const preview = require("character_preview");
  const character = require("character");
  let race = "elf";
  const name_character = getById("input_name_character");
  getById("btn_create_character").onclick = ()=> {
    let data = {
      name: name_character.innerText.trim(),
      race,
    }
    if (!isNaN(data.name)) return show("Ponle nombre al personaje");
    socket.emit("createCharacter", data);
  }

  const characterPreview = (val)=> {
    getById("content_character_run").innerText = "";
    let eng = new Engine("content_character_run");
    preview(eng, new Sprite(character(eng, val)));
  }
  getById("btn_select_elfo").onclick = ()=> {
    characterPreview(race = "elf");
    show("Elfo");
  }
  getById("btn_select_ogro").onclick = ()=> {
    characterPreview(race = "orc");
    show("Ogro");
  }
  characterPreview("elf");
  socket.on("createCharacter", function(data) {
    if (data instanceof Object) {
      show("Personaje creado")
      console.log(data)
    } else {
      show(data)
      console.log(data)
    }
  })
});