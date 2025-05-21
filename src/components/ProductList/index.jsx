import ProductItem from "../ProductItem";
import "./style.css";

export default function ProductList({ productos, onEditar, onEliminar }) {
  return (
    <div className="lista-productos">
      {productos.map((producto) => (
        <ProductItem
          key={producto.id}
          producto={producto}
          onEditar={() => onEditar(producto)}
          onEliminar={() => onEliminar(producto.id)}
        />
      ))}
    </div>
  );
}
