import { useState } from "react";
import Encabezado from "./components/Encabezado";
import ProductoCard from "./components/ProductoCard";
import FormularioProducto from "./components/FormularioProducto";
import {
  obtenerProductos,
  registrarProducto,
  actualizarProducto,
  eliminarProducto,
} from "./services/productoService";
import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // READ: botón "Consultar productos" (con mensaje)
  const consultarProductos = async () => {
    try {
      const datos = await obtenerProductos();
      setProductos(datos);
      alert("Conexión exitosa. Revisar la consola.");
      console.log("Productos del backend:", datos);
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  // READ: refresco silencioso después de crear, editar o eliminar
  const refrescarProductos = async () => {
    try {
      const datos = await obtenerProductos();
      setProductos(datos);
    } catch (error) {
      console.error("Error al actualizar productos:", error);
    }
  };

  // CREATE (POST)
  const crearProducto = async (productoData) => {
    await registrarProducto(productoData);
    alert("Producto registrado correctamente.");
  };

  // UPDATE (PUT) 
  const editarProducto = async (productoData) => {
    await actualizarProducto(productoSeleccionado.id, productoData);
    setProductoSeleccionado(null);
    alert("Producto actualizado correctamente.");
  };

  // Decide si crea o edita, y en ambos casos termina igual:
  const guardarProducto = async (productoData) => {
    try {
      if (productoSeleccionado) {
        await editarProducto(productoData);
      } else {
        await crearProducto(productoData);
      }
      await refrescarProductos();
      return true;
    } catch (error) {
      console.error("Error al procesar producto:", error);
      alert("Ocurrió un error al guardar.");
      return false;
    }
  };

  // Rellena el formulario para editar
  const seleccionarProducto = (id) => {
    const producto = productos.find((p) => p.id === id);
    setProductoSeleccionado(producto);
    console.log("Producto seleccionado para editar:", producto);
  };

  // DELETE
  const borrarProducto = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      await eliminarProducto(id);
      await refrescarProductos();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("No se pudo eliminar el producto.");
    }
  };

  return (
    <div className="contenedor">
      <Encabezado />

      <FormularioProducto
        onRegistrar={guardarProducto}
        productoEditando={productoSeleccionado}
      />

      <h2>Lista de productos</h2>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={consultarProductos}
          style={{
            backgroundColor: "#1e3a5f",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "0.95rem",
          }}
        >
          Consultar productos
        </button>
      </div>

      <div className="productos-grid">
        {productos.map((producto) => (
          <ProductoCard
            key={producto.id}
            id={producto.id}
            nombre={producto.nombre}
            categoria={producto.categoria}
            precio={producto.precio}
            stock={producto.stock}
            onEditar={seleccionarProducto}
            onEliminar={borrarProducto}
          />
        ))}
      </div>
    </div>
  );
}

export default App;