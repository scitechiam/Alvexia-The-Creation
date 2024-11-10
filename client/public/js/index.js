window.onload = (()=> {
  const save_local = require("save_local");
  const home_page = require("home_page");
  const login_page = require("login_page");
  const register_page = require("register_page");
  const create_character_page = require("create_character_page");
  const go_to_page = require("go_to_page");

  let socket = save_local.exists("token") ? connectSocketIO(save_local.get("token")): null;
  if (socket != null) {
    //startEvents(socket);
    go_to_page("home");
  } else {
    go_to_page("login");
  }


  const pages = document.querySelectorAll(".activity");
  window.onhashchange = function() {
    const hash = window.location.hash;
    for (let page of pages) {
      if (page.title != "") {
        page.style.display = page.title.match(hash) ? "flex": "none";
      }
    }
    switch (hash) {
      case "#home":
        home_page(socket);
        break;
      case "#create_character":
        create_character_page(socket);
        break;
    }
  }
  socket.on("error", (e)=> {
    if (e == "INVALID_TOKEN") {
      go_to_page("login");
    }
    console.log("error",e);
  });

  initLogic();
  login_page(socket);
  register_page(socket);

});