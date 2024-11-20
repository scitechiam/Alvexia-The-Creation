window.onload = (()=> {
  const save_local = require("save_local");
  let socket = null;
  env.token = save_local.get("token");
  env.id = save_local.get("id");
  if (env.token != null) {
    socket = io(env.BASE_URL, {
      query: {
        char_id: env.id,
        token : env.token
      }
    });
  } else {
    window.location = "/";
  }


  require("logic")(socket);
});