var Square = (function(isBackground, data) {
  this.x = verify("x", data) || 100;
  this.y = verify("y", data) || 100;
  this.W = verify("W", data) || 30;
  this.H = verify("H", data) || 30;
  this.style = verify("style", data) || "rgba(94,95,229,0.486)";
  this.draw = function(ctx) {
    if (isBackground) {
      ctx.beginPath();
      ctx.fillStyle = this.style;
      ctx.fillRect(this.x, this.y, this.W, this.H);
      ctx.fill();
      ctx.closePath();
    } else {
      ctx.beginPath();
      ctx.strokeStyle = this.style;
      ctx.lineWidth = 5;
      ctx.strokeRect(this.x, this.y, this.W, this.H);
      ctx.stroke();
      ctx.closePath();
    }
  }
});