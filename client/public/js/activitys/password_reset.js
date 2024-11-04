const PasswordReset = ()=> {
  const content_password_reset = getById("content_password_reset");
  const email_password_reset = getById("email_password_reset");
  getById("btn_back_no_reset").onclick = ()=> {
    goTo("login");
  }
}