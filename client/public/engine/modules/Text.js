var Text = (function(data) {
  this.x = verify("x", data) || 100;
  this.y = verify("y", data) || 100;
  this.text = verify("text", data) || "Text";
  this.size = verify("size", data) || 34;
  this.color = verify("color", data) || "#ffffff";
  this.draw = function(ctx) {
    ctx.font = (this.size) + "px bold, Cool Pixel";
    //ctx.fontFamily = "Cool Pixel"
   /* ctx.textAlign = "center";
    ctx.textBaseline = "middle";*/
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
});