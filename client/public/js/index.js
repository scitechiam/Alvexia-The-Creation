window.onload = (()=> {
  const save_local = require("save_local");
  const home_page = require("home_page");
  const login_page = require("login_page");
  const register_page = require("register_page");
  const create_character_page = require("create_character_page");
  const go_to_page = require("go_to_page");
  //save_local.set("token", "gggh")
  //env.WINDOW = getById("content").innerHTML;
  let socket = save_local.exists("token")? connectSocketIO(save_local.get("token")): null; // save_local.exists("token1") ? connectSocketIO(save_local.get("token1")): save_local.exists("token") ?connectSocketIO(save_local.get("token")): null;
  if (socket != null) {
    //startEvents(socket);
    socketError();
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
  initLogic();
  login_page(socket);
  register_page(socket);
  function socketError() {
    socket.on("error", function(e) {
      if (e == "INVALID_TOKEN") {
        go_to_page("login");
        if (save_local.get("token") == env.TOKEN) save_local.remove("token");
        if (save_local.get("token1") == env.TOKEN) save_local.remove("token1");
      }
      console.log("error", e);
  });
}
});