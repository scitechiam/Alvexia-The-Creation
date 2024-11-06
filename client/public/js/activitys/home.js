const Home = ()=> {
  const content_news = getById('content_news');
  const content_init = getById('content_init');
  let hash = window.location.hash;
  if (hash == "#home") {
    content_init.style.display = "flex"
  }
  client.getNews((res)=> {
    let status = verify("status", res);
    if (status == 403) show("Error de conexión");
    if (status == "error") show(`Error en el servidor:\n ${res.error}`);
    if (status != "success") return;
    for (let i of res.message) {
      let p = document.createElement("p");
      p.innerText = i;
      content_news.appendChild(p);
    }
  })
  getById("btn_init_create_character").onclick = ()=> {
    goTo("create_character");
  }
}