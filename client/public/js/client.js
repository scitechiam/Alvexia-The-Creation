const url_origin = window.location.origin;

const _config_login = {
  url: "/login",
  method: "POST",
  data: {}
};

const _config_register = {
  url: "/register",
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
callback(JSON.parse(data).type_user);
}).catch((e)=> {
callback(e);
})
}

client.register = (data_send, callback)=> {
_config_register.data = data_send;
makeRequest(_config_register).then((data)=> {
callback(JSON.parse(data).type_user);
}).catch((e)=> {
callback(e);
})
}