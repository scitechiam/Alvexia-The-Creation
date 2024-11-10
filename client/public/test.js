const module = {
  exp: {}
}
const env = {}
const require = (name)=> {
  if (module.exp[name] == null) {
    console.error(`El módulo "${name}" no fue encontrado :(`)
    return Object;
  } else {
    return module.exp[name];
  }
}
let tal = ""
const a = (b)=> {
  console.log(b)
}
a(tal = "elf");