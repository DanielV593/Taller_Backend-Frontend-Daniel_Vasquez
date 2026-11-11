import { useState, useEffect } from "react";

function FormularioProducto({ onRegistrar, productoEditando }) {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  // Rellena el formulario automáticamente si se seleccionó un producto para editar
  useEffect(() => {
    if (productoEditando) {
      setNombre(productoEditando.nombre || "");
      setCategoria(productoEditando.categoria || "");
      setPrecio(productoEditando.precio || "");
      setStock(productoEditando.stock || "");
    } else {
      setNombre("");
      setCategoria("");
      setPrecio("");
      setStock("");
    }
  }, [productoEditando]);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const productoData = {
      nombre: nombre.trim(),
      categoria: categoria.trim(),
      precio: Number(precio),
      stock: Number(stock)
    };

    const registrado = await onRegistrar(productoData);

    if (registrado) {
      setNombre("");
      setCategoria("");
      setPrecio("");
      setStock("");
    }
  };

  return (
    <form className="formulario-producto" onSubmit={manejarEnvio}>
      <h2>{productoEditando ? "Modificar producto" : "Registrar producto"}</h2>
      
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Categoría:</label>
        <input
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Precio:</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />
      </div>

      <div>
        <label>Stock:</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          min="0"
          step="1"
          required
        />
      </div>

      <button type="submit">
        {productoEditando ? "Actualizar producto" : "Guardar producto"}
      </button>
    </form>
  );
}

export default FormularioProducto;