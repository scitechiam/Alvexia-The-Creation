window.onload = (()=> {
  //saveLocal("token", "ksk")
  let socket = getLocal("token") != null ? connectSocketIO(getLocal("token")): null;
  if (socket != null) {
    startEvents(socket);
    goTo("home");
    socket.emit("getCharacters");
  } else {
    goTo("login")
  }

  const pages = document.querySelectorAll(".activity");
  window.onhashchange = function() {
    const myhash = window.location.hash;
    if (myhash == "#home") {
      socket.emit("getCharacters");
    }

    for (let page of pages) {
      if (page.title != "") {
        page.style.display = page.title.match(myhash) ? "flex": "none";
      }
    }
    if (myhash == "#create_character") {
      document.getElementById("content_character_run").innerText = ""
      const eng = new Engine("content_character_run");
      CreateCharacter(socket, eng);
      console.log("char")
    }
  }
  //  show("Hols")

  initLogic();
  Home();
  Login(socket);
  Register(socket)

});