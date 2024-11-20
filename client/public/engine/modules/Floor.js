class Floor {
  constructor(eng, data) {
    this.x = verify("x", data) || 0;
    this.y = verify("y", data) || 0;
    this.CELL = verify("CELL", data) || eng.BLOCK;
    this.W = verify("W", data) || eng.BLOCK_LENGTH * 3;
    this.H = verify("H", data) || eng.BLOCK_LENGTH * 3;
    this.speed = 3;
    this.src = verify("src", data) || defaultImage(data, true);
    this.image = verify("image", data) || defaultImage(data);
    this.elements = [];
    this.toward = new Circle(true);
    this.toward.coordinates = {
      x: eng.C_X,
      y: eng.C_Y
    }
    this.toward.speed = 5;
    this.L_W = this.W * this.CELL;
    this.L_H = this.H * this.CELL;
    this.coordinates = {
      x: eng.C_X,
      y: eng.C_Y
    };
    this.targetX = eng.C_X;
    this.targetY = eng.C_Y;
    this.isMoveX = true;
    this.isMoveY = true;
    this.order = [];
    this.eng = eng;
  }
  draw(isCreature, creature) {
    this.R_W = -this.L_W + this.eng.W;
    this.R_H = -this.L_H + this.eng.H;
    if (this.x > 0) {
      this.x = 0;
    } else if (this.x < this.R_W) {
      this.x = this.R_W;
    }
    if (this.y > 0) {
      this.y = 0;
    } else if (this.y < this.R_H) {
      this.y = this.R_H;
    }

    for (var ix = 0; ix < this.W; ix ++) {
      for (var iy = 0; iy < this.H; iy++) {
        var x = this.x + (ix * this.CELL);
        var y = this.y + (iy * this.CELL);
        if (x > -this.CELL && y > -this.CELL && x < this.eng.W && y < this.eng.H) {
          this.eng.ctx.drawImage(this.image, x, y, this.CELL, this.CELL);
        }
      }
    }
    this.toward.draw(this.eng.ctx);
    if (creature) this.fallowing(isCreature, creature)
    //  deb.draw(this.eng.ctx);
  }

  drawElements(isMx, isMy, c_x, c_y) {
    this.order.sort(function(a, b) {
      return (a.y + a.W / 2) - (b.y + b.H / 2);
    });
    for (var i = 0; i < this.order.length; i++) {
      this.order[i].draw(this.eng.ctx);
    }
    this.order = [];
    for (var i = 0; i < this.elements.length; i++) {
      if (this.elements[i].x > -this.CELL && this.elements[i].y > -this.CELL && this.elements[i].x < this.eng.W + this.CELL && this.elements[i].y < this.eng.H + this.CELL) {
        if (this.elements[i].autoMove != null) {
          this.elements[i].autoMove();
        } else {
          //this.elements[i].move(this.elements[i].coordinates);
        }

        if (this.order.indexOf(this.elements[i]) == -1) {
          this.order.push(this.elements[i]);
        }
      }
      this.elements[i].x += isMx ? c_x: 0;
      this.elements[i].coordinates.x += isMx && this.elements[i].coordinates ? c_x: 0;
      this.elements[i].y += isMy ? c_y: 0;
      this.elements[i].coordinates.y += isMy && this.elements[i].coordinates ? c_y: 0;
    }
  }

  fallowing (isCreature, creature) {
    var dx = this.targetX - this.toward.x;
    var dy = this.targetY - this.toward.y;
    if (isCreature) {
      if (creature.move != null) {
        // console.log(creature)
        creature.move({
          x: this.toward.x, y: this.toward.y
        });

      }
    }
    var distance = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx);
    if (this.x >= 0 && this.toward.x < this.eng.C_X || this.x <= this.R_W && this.toward.x > this.eng.C_X) {
      this.targetX = this.toward.x;
      this.isMoveX = false;
    } else {
      this.targetX = this.eng.C_X;
      this.isMoveX = true;
    }
    if (this.y >= 0 && this.toward.y < this.eng.C_Y || this.y <= this.R_H && this.toward.y > this.eng.C_Y) {
      this.targetY = this.toward.y;
      this.isMoveY = false;
    } else {
      this.targetY = this.eng.C_Y;
      this.isMoveY = true;
    }
    if (isCreature) {
      if (creature.distance == 0) {
        this.toward.style = "transparent";
      } else {
        this.toward.style = "rgba(94,95,229,0.486)";
      }
    }
    if (distance > this.toward.speed) {
      var count_x = Math.floor(this.toward.speed * Math.cos(angle));
      var count_y = Math.floor(this.toward.speed * Math.sin(angle));
      this.toward.x += this.isMoveX ? count_x: 0;
      this.x += this.isMoveX ? count_x: 0;
      this.toward.y += this.isMoveY ? count_y: 0;
      this.y += this.isMoveY ? count_y: 0;
      this.drawElements(this.isMoveX, this.isMoveY, count_x, count_y)
    } else {
      this.toward.x = this.targetX;
      this.toward.y = this.targetY;
      this.drawElements(false, false, 0, 0)
    }
    //  deb.text = "x:" + parseInt((this.x * -1) + this.toward.x) + " y:" + parseInt((this.y * -1) + this.toward.y);
  }
  getById (id) {
    let msg = {};
    for (var i = 0; i < this.elements.length; i++) {
      if (this.elements[i].id == id) {
        msg = this.elements[i];
      }
    }
    return msg;
  }
  index(id) {
    for (let i of this.elements) {
      if (i.id == id) {
        return this.elements.indexOf(i);
      }
    }
  }

}