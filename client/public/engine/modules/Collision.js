const circleCollision = (a, b)=> {
  let dx = a.x - b.x;
  let dy = a.y - b.y;
  let rS = 20; // a.radius + b.radius;
  return (dx * dx + dy * dy <= rS * rS);
}
const moveSprite = (a, b, v)=> {
  if (circleCollision(a, b)) {
    if (b.animation == null) {
      switch(a.direction){
        case "left":
          a.y+= v;
          break;
          case "right":
            a.y-= v;
            break;
            case "top":
              a.x +=v;
              break;
              case "bottom":
                a.x -=v;
                break;
      }
    }
  }
} 