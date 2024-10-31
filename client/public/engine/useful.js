var defaultBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAABlSURBVBiVfY9LDcAgEETfNpvgAAt1gBZQWLTgAAt1wIkeyAJpms5xPpkZuc7QAVItwgbjD4Do3SRMjN4BoCNpxDBF78h3I9Ui8pUycVb8Qfd0vhtWAaGnWkR3cT1Zm/TduS6PwQ9HaDYmZ70fKgAAAABJRU5ErkJggg==";
var listFrame = function(e) {
  var arr = [];
  for (var i = 0; i < e; i++) {
    arr.push(i)
  }
  return arr;
}
function minMax(min, max) {
  return (Math.floor(Math.random() * (max - min))) + min
}
var x_y = function(x, y) {
  return {
    x: x,
    y: y
  };
}
function defaultId() {
  var resultId = "id_";
  for (var i = 0; i < 7; i++) {
    var randomNumb = Math.floor(Math.random() * 10);
    resultId += randomNumb;
  }
  return resultId;
}
function verify(value, data) {
  var obj = data || {};
  var array = Object.keys(obj);
  if (array.indexOf(value) == -1) {
    return false;
  } else {
    return data[value];
  }
}
function insertIntoSorted(arr, element) {
  let index = 0;
  while (index < arr.length && (arr[index].y + arr[index].H / 2) < (element.y + element.H / 2)) {
    index++;
  }
  arr.splice(index, 0, element);
}

function defaultImage(data, isSrc) {
  var img = new Image();
  var src = "";
  if (!isNaN(verify("src", data))) {
    img.src = defaultBase64;
    src = "defaultImage"
  } else {
    img.src = data.src;
    src = data.src;
  }
  return isSrc ? src: img;
}
function reject(c1, c2) {
  var size = 30;
  var overlap = 0.1;
  var dx = c2.x - c1.x;
  var dy = c2.y - c1.y;
  var distance = Math.sqrt(dx * dx + dy * dy)
  if (distance <= size * 2 + overlap) {
    var overlapAmount = (size * 2 + overlap) - distance;
    var directionX = dx / distance;
    var directionY = dy / distance;
    c1.x -= directionX * (overlapAmount / 2);
    c1.y -= directionY * (overlapAmount / 2);
    c2.x += directionX * (overlapAmount / 2);
    c2.y += directionY * (overlapAmount / 2);
  }
}
function getOrder(array) {
  return array.sort(function(a, b) {
    return (a.y + a.H / 2) - (b.y + b.H / 2);
  });
}