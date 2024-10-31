window.onload = (()=> {
  const content_login = getById("content_login");
  const email_login = getById("email_login");
  const password_login = getById("password_login");
  const btn_start_login = getById("btn_start_login");

  const content_register = getById("content_register");
  const name_register = getById("name_register");
  const email_register = getById("email_register");
  const password_register = getById("password_register");
  const password2_register = getById("password2_register");
  const btn_start_register = getById("btn_start_register");

  const content_password_reset = getById("content_password_reset");
  const email_password_reset = getById("email_password_reset");

  const show = (text)=> {
    toast(getById("toast"), text);
  }

  const goTo = (content1, content2)=> {
    setTimeout(()=> {
      content1.style.display = "none";
      content2.style.display = "block";
    }, 100);
  }

  getById("btn_back_login").onclick = ()=> {
    goTo(content_register, content_login);
  }
  getById("btn_go_regsiter").onclick = ()=> {
    goTo(content_login, content_register);
  }
  getById("btn_password_reset").onclick = ()=> {
    goTo(content_login, content_password_reset);
  }
  getById("btn_back_no_reset").onclick = ()=> {
    goTo( content_password_reset, content_login);
  }

  btn_start_login.onclick = ()=> {
    let data = {
      email: email_login.innerText,
      password: password_login.innerText
    }
    client.login(data, (res)=> {
      console.log(res)
      show(res.status)
    })
  }

  initLogic();

});