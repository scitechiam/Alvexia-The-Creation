class Circle {
  constructor(isBackground, data) {
    this.x = verify("x", data) || 100;
    this.y = verify("y", data) || 100;
    this.size = verify("size", data) || 30;
    this.style = verify("style", data) || "rgba(94,95,229,0.486)"
    this.isBackground = isBackground;
  }
  draw = function(ctx) {
    if (this.isBackground) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.style;
      ctx.fill();
      ctx.closePath();
    } else {
      ctx.beginPath();
      ctx.strokeStyle = this.style;
      ctx.lineWidth = 5;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    }
  }
}