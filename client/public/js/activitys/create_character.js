const CreateCharacter = (socket)=> {
  const content_create_character = getById("content_create_character");
  const name_character = getById("name_character");
  getById("btn_create_character").onclick = ()=> {
    let data = {
      name: name_character.innerText.trim(),
      race: "elf"
    }
    if (!isNaN(data.name)) return show("Ponle nombre al personaje");
    socket.emit("createCharacter", data);
  }
}