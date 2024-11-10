module.exp.home_page = (socket)=> {
  const preview = require("character_preview");
  const character = require("character");

  const content_news = getById('content_news');
  const content_init = getById('content_init');
  const content_select_character_home = getById("content_select_character_home");
  let haveCharacter = false;
  let characters = [];
  let selected_char = ""
  console.log(content_init)
  if (window.location.hash == "#home" && content_init.style.display == "none") {
    window.location = "/"
  }
  socket.emit("getCharacters");
  const characterPreview = (char)=> {
    getById("content_character_select_run_home").innerText = "";
    let eng = new Engine("content_character_select_run_home");
    preview(eng, new Sprite(character(eng, char.race)));
    getById("text_name_character").innerText = char.name;
  }
  client.getNews((res)=> {
    let status = verify("status", res);
    if (status == 403) show("Error de conexión");
    if (status == "error") show(`Error en el servidor:\n ${res.error}`);
    if (status != "success") return;
    content_news.innerText = "";
    for (let i of res.message) {
      let p = document.createElement("p");
      p.innerText = i;
      content_news.appendChild(p);
    }
  });
  getById("btn_init_create_character").onclick = ()=> {
    goTo("create_character");
  }
  getById("btn_init_play").onclick = ()=> {

    if (haveCharacter) {

      socket.emit("enterWorld", {
        selected_char: selected_char
      })
      socket.emit("getMap");
    } else {
      show("No tienes ningún personaje");
    }
  }
  let count_char = 0;
  getById("btn_character_back_home").onclick = ()=> {
    if (count_char > 0) {
      count_char--;
    } else {
      getById("btn_character_back_home").disabled = true;
      return;
    }
    selected_char = characters[count_char].uid;
    console.log(selected_char)
    characterPreview(characters[count_char]);
  }
  getById("btn_character_next_home").onclick = ()=> {
    if (count_char < characters.length -1) {
      count_char++;
    } else {
      return;
    }
    selected_char = characters[count_char].uid;
    characterPreview(characters[count_char]);
  }
  socket.on("enterWorld", function(data) {
    console.log(data)
  })
  socket.on("getMap", function(data) {
    console.log(data)
  })
  socket.on("getCharacters",
    function(data) {
      if (data instanceof Object) {
        haveCharacter = data.length != 0;
        show((data.length == 0 ? "Debes crear al menos un personaje": (content_select_character_home.style.display = "flex", `Tienes ${data.length} personajes`)))
        characters = data;
        selected_char = data[0].uid;
        characterPreview(data[0]);
        console.log(data)
      } else {
        show(data)
        console.log(data)
      }
    });
}