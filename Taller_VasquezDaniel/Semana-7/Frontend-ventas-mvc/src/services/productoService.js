import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "x-token": "ventas2026"
  }
});

export const obtenerProductos = async () => {
  const respuesta = await api.get("/productos");
  return respuesta.data;
};

export const registrarProducto = async (producto) => {
  const respuesta = await api.post("/productos", producto);
  return respuesta.data;
};

export const actualizarProducto = async (id, producto) => {
  const respuesta = await api.put(`/productos/${id}`, producto);
  return respuesta.data;
};

export const eliminarProducto = async (id) => {
  const respuesta = await api.delete(`/productos/${id}`);
  return respuesta.data;
};