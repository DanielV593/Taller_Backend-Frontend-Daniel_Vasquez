import { listarProductos } from "./src/models/productoModel.js";

try {
  const productos = await listarProductos();
  console.log("Productos obtenidos del archivo JSON:");
  console.log(productos);
} catch (error) {
  console.error("Error al leer productos:", error.message);
}


