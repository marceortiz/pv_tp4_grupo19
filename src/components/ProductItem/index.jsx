import "./style.css";

export default function ProductItem({ producto, onEditar, onEliminar }) {
  return (
    <div className="item-producto">
      <h3>{producto.descripcion}</h3>
      <p>ID: {producto.id}</p>
      <p>Precio: ${producto.precioUnitario}</p>
      <p>Descuento: {producto.descuento}%</p>
      <p>
        <strong>
          Con descuento: ${producto.precioConDescuento.toFixed(2)}
        </strong>
      </p>
      <p>Stock: {producto.stock}</p>
      <button onClick={onEditar}>Editar</button>
      <button onClick={onEliminar}>Eliminar</button>
    </div>
  );
}
