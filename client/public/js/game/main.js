module.exports.game = ((attrs)=> {
  const content = gtById("xwindow");
  const character= require('character');
  content.innerText = "";
  const eng = new Engine("xwindow");
  const player = new Sprite(character(attrs.race));

})