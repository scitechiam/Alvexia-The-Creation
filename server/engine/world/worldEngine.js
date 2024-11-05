const fs = require("fs");
var WORLD = {} , PJS = {};
const { SERVER } = require("../../../config.js");
const mapsRoute = SERVER + "/database/maps/";
const User = require(SERVER + "/database/models/User.js");
const Character = require(SERVER + "/database/models/Character.js");


// Función para cargar todos los mapas en el objeto WORLD
const loadMaps = () => {
  const files = fs.readdirSync(mapsRoute); // Lee todos los archivos en el directorio de mapas
  files.forEach(file => {
    if (file.endsWith(".json")) {
      const data = fs.readFileSync(`${mapsRoute}${file}`, "utf8");
      const mapData = JSON.parse(data);
      const key = `${mapData.x}_${mapData.y}`; // Usa la posición para definir la clave del mapa en WORLD
      WORLD[key] = mapData; // Guarda el mapa en el objeto WORLD usando las coordenadas como clave
      PJS[key] = {};
    }
  });
  console.log("Map segments loaded successfully into WORLD.");
};

// Función para crear un nuevo mapa
const createMap = (name, x, y, size_x, size_y) => {
  const mapKey = `${x}_${y}`;

  if (WORLD[mapKey]) {
    return { status: "error", message: "MAP_EXISTS" };
  }

  // Crear el objeto del mapa
  const newMap = {
    name,
    x,
    y,
    size_x,
    size_y,
    objects: [],
    npcs: [],
    collectibles: [],
    triggers: []
  };

  // Agregar el nuevo mapa a WORLD
  WORLD[mapKey] = newMap;
  PJS[mapKey] = {};

  // Guardar el nuevo mapa en un archivo JSON
  fs.writeFileSync(`${mapsRoute}${mapKey}.json`, JSON.stringify(newMap, null, 2), "utf8");
  console.log(`New map segment ${mapKey} created and saved.`);

  return { status: "success", message: newMap };
};

const getMap = (x, y) => {
  const mapKey = `${x}_${y}`;

  if (!WORLD[mapKey]) {
    return { status: "error", message: "MAP_DONT_EXISTS" };
  }
  return { status: "success", message: { world: WORLD[mapKey], pjs: PJS } };
}

const joinMap = async (zone, coords, socket, io) => {
  const char = await Character.findById(socket.char_id);

  if (!char) return { status: "error", message: "CHAR_NOT_FOUND" };
  
  const map = getMap(zone.x , zone.y);
  if(map.status == "error") return map;
  
  
  const mapKey = `${zone.x}_${zone.y}`;
  
  PJS[mapKey][socket.char_id] = {
    name: char.name,
    skin: char.skin,
    level: char.level,
    coords: coords,
    isMoving: false,
    movingTo: null
  };
  
  socket.emit("getMap" , map.message);
  socket.join(mapKey);
  
  socket.to(mapKey).emit("newPj" , PJS[mapKey][socket.char_id]);
  
  return {status: "success" , message: "JOINED_MAP"};

};


module.exports = {
  createMap,
  loadMaps,
  getMap,
  joinMap
}