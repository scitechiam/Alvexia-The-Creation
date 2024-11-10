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
module.exp.go_to_page = (page)=> {
  window.location.hash = page;
}
module.exp.save_local = {
  set: (key, value)=> {
    window.localStorage.setItem(key, value);
  },
  get: (key)=> {
    if (module.exp.save_local.exists(key)) {
      return window.localStorage.getItem(key);
    } else {
      console.error(`No existe la key "${key}"`);
      return;
    }
  },
  exists: (key)=> {
    return window.localStorage.getItem(key) != null;
  }
}
window.module = module;