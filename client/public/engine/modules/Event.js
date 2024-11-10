class EngineEvent {
  constructor(eng) {
    this.client_rect = eng.canvas.getBoundingClientRect();
    this.canvas = eng.canvas;
  }
  on(type, callback) {
    switch (type) {
      case "touchmove":
        this.OnTouchMove(callback);
        break
      case "click":
        this.OnClick(callback);
        break;
      case "all":
        this.OnAll(callback);
        break;
    }
  }
  OnTouchMove(callback) {
    this.canvas.ontouchmove = (ev)=> {
      ev.preventDefault();
      var pageX = ev.touches[0].pageX;
      var pageY = ev.touches[0].pageY;
      if (callback) {
        callback( {
          x: pageX - this.client_rect.left,
          y: pageY - this.client_rect.top
        });
      }
    };
    this.canvas.onmausemove = (ev)=> {
      var pageX = ev.pageX;
      var pageY = ev.pageY;
      if (callback) {
        callback( {
          x: pageX - this.client_rect.left,
          y: pageY - this.client_rect.top
        });
      }
    };
  }
  OnClick(callback) {
    this.canvas.onclick = (ev)=> {
      var pageX = ev.pageX;
      var pageY = ev.pageY;
      if (callback) {
        callback( {
          x: pageX - this.client_rect.left,
          y: pageY - this.client_rect.top
        });
      }
    };
  }
  OnAll(callback) {
    this.OnClick(callback);
    this.OnTouchMove(callback);
  }
}