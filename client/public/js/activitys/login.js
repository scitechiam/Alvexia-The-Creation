module.exp.login_page = (socket)=> {
  const content_login = getById("content_login");
  const email_login = getById("email_login");
  const password_login = getById("password_login");
  const btn_start_login = getById("btn_start_login");

  getById("btn_go_regsiter").onclick = ()=> {
    goTo("register");
  }
  getById("btn_password_reset").onclick = ()=> {
    goTo("password_reset");
  }
  getById("btn_start_login").onclick = ()=> {
    let data = {
      email: email_login.innerText.trim(),
      password: password_login.innerText.trim()
    }
    if (!isNaN(data.email) || !isNaN(data.password)) return show("No dejes ningún campo vacío"); // return;

    client.login(data, (res)=> {
      let status = verify("status", res);
      if (status == 403) return show("Error de conexión");
      if (status == "error") return show(`Error en el servidor:\n ${res.error}`);
      if (status != "success") return show("Error desconocido");
      saveLocal("token", res.token);
      goTo("home");
      socket = connectSocketIO(res.token);
      startEvents(socket);
    })
  };
}