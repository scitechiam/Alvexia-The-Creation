const fs = require("fs");
var WORLD = {};
const { SERVER } = require("../../../config.js");
const mapsRoute = SERVER + "/database/maps/";

// Función para cargar todos los mapas en el objeto WORLD
const loadMaps = () => {
  const files = fs.readdirSync(mapsRoute); // Lee todos los archivos en el directorio de mapas
  files.forEach(file => {
    if (file.endsWith(".json")) {
      const data = fs.readFileSync(`${mapsRoute}${file}`, "utf8");
      const mapData = JSON.parse(data);
      const key = `${mapData.x}_${mapData.y}`; // Usa la posición para definir la clave del mapa en WORLD
      WORLD[key] = mapData; // Guarda el mapa en el objeto WORLD usando las coordenadas como clave
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
  };

  // Agregar el nuevo mapa a WORLD
  WORLD[mapKey] = newMap;

  // Guardar el nuevo mapa en un archivo JSON
  fs.writeFileSync(`${mapsRoute}${mapKey}.json`, JSON.stringify(newMap, null, 2), "utf8");
  console.log(`New map segment ${mapKey} created and saved.`);

  return { status: "success", message: newMap };
};



module.exports = {
  createMap,
  loadMaps
}