const module = {
  exp: {}
}
const env = {
  BASE_URL: window.location.origin
}
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
module.exp.post = ((url, data)=> {
  return new Promise((resolve, reject)=> {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = ()=> {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject( {
            text: xhr.responseText,
            status: xhr.status
          });
        }
      }
    }
  });
});
module.exp.storage = window.sessionStorage;
module.exp.save_local = {
  set: (key, value)=> {
    module.exp.storage.setItem(key, value);
  },
  get: (key)=> {
    if (module.exp.save_local.exists(key)) {
      return module.exp.storage.getItem(key);
    } else {
      console.error(`No existe la key "${key}"`);
      return;
    }
  },
  exists: (key)=> {
    return module.exp.storage.getItem(key) != null;
  },
  remove: (key)=> {
    if (module.exp.save_local.exists(key)) {
      module.exp.storage.removeItem(key);
    } else {
      console.error(`No existe la key "${key}"`);
    }
  }
}
window.module = module;