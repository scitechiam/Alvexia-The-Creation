const BASE_URL = window.location.origin;

const _config_login = {
  url: "auth/login",
  method: "POST",
  data: {}
};

const _config_register = {
  url: "auth/register",
  method: "POST",
  data: {}
};
const _config_news = {
  url: "news",
  method: "POST",
  data: {}
};

const client = {};

const makeRequest = (obj)=> {
  return new Promise((resolve, reject)=> {
    var xhr = new XMLHttpRequest();
    xhr.open(obj.method, obj.url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(obj.data));
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
}

client.login = (data_send, callback)=> {
  _config_login.data = data_send;
  makeRequest(_config_login).then((data)=> {
    console.log(data)
    callback(JSON.parse(data));
  }).catch((e)=> {
    callback(e);
  })
}

client.register = (data_send, callback)=> {
  _config_register.data = data_send;
  makeRequest(_config_register).then((data)=> {
    callback(JSON.parse(data));
  }).catch((e)=> {
    callback(e);
  })
}
client.getNews = (callback)=> {
  //_config_news.data = data_send;
  makeRequest(_config_news).then((data)=> {
    callback(JSON.parse(data));
  }).catch((e)=> {
    callback(e);
  })
}
function connectSocketIO(token) {
    return io(BASE_URL, {
      query: {
        token
      }
    });
  }
  function startEvents(socket) {
    socket.on("createCharacter", (data)=> {
      if (data instanceof Object) {
        show("Personaje creado")
        console.log(data)
      } else {
        show(data)
        console.log(data)
      }
    });
    socket.on("getCharacters",
      (data)=> {
        if (data instanceof Object) {
          show("Tienes " + data.length +" personajes creado")
          console.log(data)
        } else {
          show(data)
          console.log(data)
        }
      });
    socket.on("error",
      (e)=> {
        if (e == "INVALID_TOKEN"){ 
          goTo("login");
        console.log(e)
        }
      })
  }