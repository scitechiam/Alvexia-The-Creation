const getById = (id)=> {
  try {
  return document.getElementById(id);
  } catch(e){
    console.log(e)
    return {};
  }
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
    cont.innerText = text;
    getById("xwindow").appendChild(cont);
    setTimeout(()=> {
      cont.style.transform = "translateX(100vw)"
      setTimeout(()=>{
      getById("xwindow").removeChild(cont);
      }, 100);
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