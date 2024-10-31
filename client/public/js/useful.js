const getById = (id)=> {
  return document.getElementById(id);
}
const toast = (content, text)=> {
  let count = 0;
  content.style.display = "block";
  content.innerText = text;
  setTimeout(()=> {
    content.style.display = "none"
  }, 4000)
}