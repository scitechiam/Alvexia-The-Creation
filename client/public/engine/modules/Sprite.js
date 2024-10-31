class Sprite extends Texture {
  autoMove() {
    if (this.isAutoMove) {
      this.move(this.coordinates);
      if (this.distance == 0) {
        let TIME_STOP_ENEMY = 50 * (Math.floor(Math.random() * 200));
        this. count_auto_move++;
        if (this.count_auto_move >= TIME_STOP_ENEMY) {
          this.coordinates.x = minMax(this.floor.CELL / 2, (this.floor.L_W - (this.floor.CELL / 2))) + this.floor.x;
          this.coordinates.y = minMax(this.floor.CELL / 2, (this.floor.L_H - (this.floor.CELL / 2))) + this.floor.y;
          this.count_auto_move = 0;
        }
      }
    }
  }
  move(touch) {
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
        this.direction = dx >= 0 ? "left": "right";
      } else {
        this.direction = dy >= 0 ? "bottom": "top";
      }
    }
    var isStop =distance == 0;
    var frames = isStop ? this.animation.stop[this.direction]: this.animation.run[this.direction];
    this.SPEED_FRAMES = 5;
    this.count_move++;
    if (this.count_move >= this.SPEED_FRAMES) {
      this.animation.toY = frames.y + this.animation.y;
      var toX = this.animation.x;
      if (isStop) {
        this.count_stop++;
        if (this.count_stop > (50 + Math.floor(Math.random()*200))) {
          toX = this.animation.toX >= frames.x + this.animation.x ? this.animation.x: this.animation.toX + 1;
          this.count_stop = 0;
        }
      } else {
        toX = this.animation.toX >= frames.x + this.animation.x ? this.animation.x: this.animation.toX + 1;
      }
      this.animation.toX = toX;
      this.count_move = 0;
    }
  }
}