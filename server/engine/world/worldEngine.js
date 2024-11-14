const fs = require("fs");
var WORLD = {},
  PJS = {};
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
      Engine.addLoop(key);
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
    default_texture: "g_1",
    objects: [],
    npcs: [],
    creatures: [],
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
  return { status: "success", message: { world: WORLD[mapKey], pjs: PJS[mapKey] } };
}

const joinMap = async (zone, coords, socket, io, pjStatus) => {
  const char = await Character.findById(socket.char_id);

  if (!char) return { status: "error", message: "CHAR_NOT_FOUND" };

  const map = getMap(zone.x, zone.y);
  if (map.status == "error") return map;


  const mapKey = `${zone.x}_${zone.y}`;

  if (pjStatus) {
    PJS[mapKey][socket.char_id] = pjStatus;
    PJS[mapKey][socket.char_id].coords = coords;
  }
  else PJS[mapKey][socket.char_id] = {
    name: char.name,
    skin: char.skin,
    level: char.level,
    coords: coords,
    isMoving: false,
    speed: char.speed || 1
  };

  socket.emit("getMap", map.message);
  socket.join(mapKey);
  socket.cmap = mapKey;

  socket.to(mapKey).emit("newPj", {
    [socket.char_id]: PJS[mapKey][socket.char_id]
  });

  return { status: "success", message: "JOINED_MAP" };

};

const leaveMap = async (socket, io) => {
  const char = await Character.findById(socket.char_id);

  if (!char) return { status: "error", message: "CHAR_NOT_FOUND" };

  const map = getMap(char.zone.x, char.zone.y);
  if (map.status == "error") return map;


  const mapKey = `${char.zone.x}_${char.zone.y}`;

  await socket.to(mapKey).emit("delPj", socket.char_id);
  const currentStatus = { ...PJS[mapKey][socket.char_id] };
  delete PJS[mapKey][socket.char_id];
  return { status: "success", message: currentStatus };
};

const switchMap = async (zone, coords, socket, io) => {
  const cstatus = await leaveMap(socket, io);
  if (cstatus.status == "error") return cstatus;
  const newMap = await joinMap(zone, coords, socket, io, cstatus);
  return newMap;
};

var MOVES = {};
const movePj = async (socket , x , y) => {
  if(!socket.cmap) return; 
  if(!PJS[socket.cmap] || !PJS[socket.cmap][socket.char_id]) return;
  PJS[socket.cmap][socket.char_id].isMoving = true;
  PJS[socket.cmap][socket.char_id].coords = { x , y};
  if(!MOVES[socket.cmap]) MOVES[socket.cmap] = {};
  MOVES[socket.cmap][socket.char_id] = {x , y};
};

const IO = require("../../server.js").io;

const engine = (ms) => {
  var loops = {};
  const addLoop = (mapKey) => {
    if (loops[mapKey]) return;
    const loop = () => {
      IO.to(mapKey).emit("moves" , MOVES[mapKey]);
      MOVES[mapKey] = {};
    };
    loops[mapKey] = setInterval(loop, ms);
  };

  return { addLoop };
};

const Engine = engine(30);

module.exports = {
  createMap,
  loadMaps,
  getMap,
  joinMap,
  leaveMap,
  switchMap,
  movePj,
  Engine
}