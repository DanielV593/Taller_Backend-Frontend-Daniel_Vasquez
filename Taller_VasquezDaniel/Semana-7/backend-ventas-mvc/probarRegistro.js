import { registrarProducto } from "./src/models/productoModel.js";

try {
  const producto = {
    nombre: "Monitor Samsung",
    precio: 180,
    stock: 12
  };

  const resultado = await registrarProducto(producto);

  console.log("Producto registrado:", resultado);
} catch (error) {
  console.error("Error:", error.message);
}
