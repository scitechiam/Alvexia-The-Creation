var Texture = (function(data) {
  this.W = verify("W", data) || 100;
  this.H = verify("H", data) || 100;
  this.x = verify("x", data) || 100;
  this.y = verify("y", data) || 100;
  this.speed = verify("speed", data) || 5;
  this.src = defaultImage(data, true);
  this.frameX = verify("frameX", data) || [0];
  this.frameY = verify("frameY", data) || [0];
  this.id = verify("id", data) || defaultId();
  this.image = verify("image", data) || defaultImage(data);
  if (verify("animation", data)) {
    this.animation = data.animation;
    this.animation.x = verify("x", this.animation) || 0;
    this.animation.y = verify("y", this.animation) || 0;
    this.animation.toX = this.animation.x != 0 ? this.animation.x: 0;
    this.animation.toY = this.animation.y != 0 ? this.animation.y: 0;
  }
  this.coordinates = verify("coordinates", data) || {
    x: this.x || 0,
    y: this.y || 0
  }
  this.isAutoMove = verify("isAutoMove", data) || false;
  this.floor = verify("floor", data) || {
    x: 500,
    y: 500,
    L_W: 800,
    L_H: 800
  };
  this.count_auto_move = 0;
  this.draw = function (ctx) {
    if (verify("animation", data)) {
      var W = this.image.width / this.animation.frameX.length;
      var H = this.image.height / this.animation.frameY.length;
      var scW = W * this.animation.scale;
      var scH = H * this.animation.scale;
      ctx.beginPath();
      ctx.arc(this.x, this.y + W / 2, 18, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(41,41,41,0.256)"
      ctx.fill();
      ctx.closePath();
      this.W = W;
      this.H = H;
      ctx.drawImage(this.image, this.animation.frameX[this.animation.toX] * W, this.animation.frameY[this.animation.toY] * H, W, H, this.x - scW / 2, this.y - scH / 2, scW, scH);
    } else {
      ctx.drawImage(this.image, this.x - (this.W / 2), this.y - (this.H / 2), this.W, this.H)
    }
  }
  /* var count_move = 0;
   this.autoMove = function() {
    if (this.isAutoMove) {
      this.move(this.coordinates);
      if (this.distance == 0) {
        let TIME_STOP_ENEMY = 50 * (Math.floor(Math.random() * 200));
        count_move++;
        if (count_move >= TIME_STOP_ENEMY) {
          this.coordinates.x = minMax(this.floor.CELL / 2, (this.floor.L_W - (this.floor.CELL / 2))) + this.floor.x;
          this.coordinates.y = minMax(this.floor.CELL / 2, (this.floor.L_H - (this.floor.CELL / 2))) + this.floor.y;
          count_move = 0;
        }
      }
    }
  }*/
  this.count_move = 0;
  this.direction = "bottom";
  this.SPEED_FRAMES = 5;
  this.count_stop = 0;
  this.distance = 0;
  /*
this.move = function(touch) {
    var dx = touch.x - this.x;
    var dy = touch.y - this.y;
    var distance = this.distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > this.speed) {
      var angle = Math.atan2(dy, dx);
      this.x += this.speed * Math.cos(angle);
      this.y += this.speed * Math.sin(angle);
    } else {
      this.x = touch.x;
      this.y = touch.y;
    }
    if (distance > 0) {
      if (Math.abs(dx) > Math.abs(dy)) {
        direction = dx >= 0 ? "left": "right";
      } else {
        direction = dy >= 0 ? "bottom": "top";
      }
    }
    var isStop = distance == 0;
    var frames = isStop ? this.animation.stop[direction]: this.animation.run[direction];
    SPEED_FRAMES = 5;
    count++;
    if (count >= SPEED_FRAMES) {
      this.animation.toY = frames.y + this.animation.y;
      var toX = this.animation.x;
      if (isStop) {
        count_stop++;
        if (count_stop > (50 + Math.floor(Math.random()*200))) {
          toX = this.animation.toX >= frames.x + this.animation.x ? this.animation.x: this.animation.toX + 1;
          count_stop = 0;
        }
      } else {
        toX = this.animation.toX >= frames.x + this.animation.x ? this.animation.x: this.animation.toX + 1;
      }
      this.animation.toX = toX;
      count = 0;
    }
  }*/
});