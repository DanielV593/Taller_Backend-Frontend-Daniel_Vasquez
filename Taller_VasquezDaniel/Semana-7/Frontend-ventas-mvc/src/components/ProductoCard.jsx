function ProductoCard({ id, nombre, precio, stock, onEditar, onEliminar }) {
  return (
    <article className="producto-card">
      <h3>{nombre}</h3>
      <p>Precio: <strong>${precio}</strong></p>
      <p>Stock: {stock}</p>
      
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button 
          onClick={() => onEditar(id)} 
          style={{ backgroundColor: "#f59e0b", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
        >
          Editar
        </button>
        <button 
          onClick={() => onEliminar(id)} 
          style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default ProductoCard;