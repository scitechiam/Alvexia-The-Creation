module.exp.register_page = (socket)=> {
  const save_local = require("save_local");
  const content_register = getById("content_register");
  const email_register = getById("email_register");
  const password_register = getById("password_register");
  const password2_register = getById("password2_register");
  const btn_start_register = getById("btn_start_register");
  getById("btn_back_login").onclick = ()=> {
    goTo("login");
  }
  getById("btn_start_register").onclick = ()=> {
    let data = {
      email: email_register.innerText.trim(),
      password: password_register.innerText.trim()
    }
    if (!isNaN(data.email) || !isNaN(data.password)) return show("No dejes ningún campo vacío"); // return;

    if (data.password != password2_register.innerText.trim()) return show("No coinciden las contraseñas")
    client.register(data, (res)=> {
      let status = verify("status", res);
      if (status == 403) show("Error de conexión");
      if (status == "error") show(`Error en el servidor:\n ${res.error}`);
      if (status != "success") return;
      if (!save_local.exists("token")) {
        save_local.set("token", res.token);
      } else {
        save_local.set("token1", res.token);
      }
      window.location.reload();
     /* goTo("home");
      socket = connectSocketIO(res.token);
      startEvents();*/
    })
  };
  console.log(window.location)
}