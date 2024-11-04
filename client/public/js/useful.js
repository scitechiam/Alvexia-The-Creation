const getById = (id)=> {
  return document.getElementById(id);
}
const saveLocal = (key, value)=> {
  window.localStorage.setItem(key, value);
}
const getLocal = (key)=> {
  return window.localStorage.getItem(key);
}
const removeLocal = (key)=> {
  return window.localStorage.removeItem(key);
}
const toast = (content, text)=> {
  let count = 0;
  content.style.display = "block";
  content.innerText = text;
  setTimeout(()=> {
    content.style.display = "none"
  }, 4000)
}
class Toast {
  constructor(text) {
    const cont = document.createElement("div");
    cont.className = "toast-success";
    getById("xwindow").appendChild(cont)
    setTimeout(()=> {
      getById("xwindow").removeChild(cont)
    }, 4000);
  }
}
const show = (text)=> {
  new Toast(text);
  /*
  const cont = document.createElement("div");
  cont.className = "toast-success";
  toast(cont, text);
  getById("xwindow").appendChild(cont)*/

}
const goTo = (href)=> {
  setTimeout(()=> {
    window.location.hash = href;
  }, 100);
}