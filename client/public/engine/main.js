class Engine {
  constructor(id) {
    var content = document.getElementById(id);
    var cont_rect = content.getBoundingClientRect();
    this.canvas = document.createElement("canvas");
    this.W = this.canvas.width = cont_rect.width;
    this.H = this.canvas.height = cont_rect.height;
    this.ctx = this.canvas.getContext("2d");
    this.C_X = (this.W / 2);
    this.C_Y = (this.H / 2);
    this.BLOCK_LENGTH = 5;
    this.BLOCK = Math.min(this.W / this.BLOCK_LENGTH, this.H / this.BLOCK_LENGTH);
    content.appendChild(this.canvas);
    this.fpsDetails = {
      textFps: new Text( {
        x: this.W - 150,
        y: 50,
        text: "Loading"
      }),
      lastTime: 0,
      COUNT_FPS: 0,
      fps: 0
    }
    this.count = 0;

  }
  begin(callback, isClear) {
    if (isClear) this.ctx.clearRect(0, 0, this.W, this.H);
    return window.requestAnimationFrame(callback);
  }
  //  kk();
  updateCoordinate() {}
  updateFPS() {
    this.count = this.count > 10 ? 0: this.count+1;
    if (this.count > 9) {
      var now = performance.now();
      var deltaTime = (now - this.fpsDetails.lastTime) / 1000;
      this.fpsDetails.fps = Math.round(1 / deltaTime);
      this.fpsDetails.lastTime = now;

      this.fpsDetails.COUNT_FPS++;
    }
    this.fpsDetails.textFps.draw(this.ctx);
    if (this.fpsDetails.COUNT_FPS > 40) {
      this.fpsDetails.textFps.text = "FPS:" + this.fpsDetails.fps;
      this.COUNT_FPS = 0;
    } else {
      let text = this.fpsDetails.textFps.text
      if (this.count % 8) {
        this.fpsDetails.textFps.text += "."
      } else {
        this.fpsDetails.textFps.text = "Loading"
      }
    }

  }
}