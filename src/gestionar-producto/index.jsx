import { useState, useEffect } from "react";
import { Producto } from "../models/product.model";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import "./style.css";

export default function GestionarProducto() {
  const [productos, setProductos] = useState([]);
  const [productoEditado, setProductoEditado] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    console.log("Productos actualizados:", productos);
  }, [productos]);

  const agregarProducto = (datosProducto) => {
    const nuevoProducto = new Producto(datosProducto);
    setProductos([...productos, nuevoProducto]);
  };

  const actualizarProducto = (productoActualizado) => {
    setProductos(
      productos.map((p) =>
        p.id === productoActualizado.id ? { ...p, ...productoActualizado } : p
      )
    );
    setProductoEditado(null);
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  const productosFiltrados = productos.filter(
    (p) =>
      p.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.id.toString().includes(busqueda),
  );

  return (
    <div className="contenedor">
      <h1>Gestión de Productos</h1>
      <div className="grid-principal">
        <div className="columna-izq">
          <SearchBar onSearch={setBusqueda} />
          <ProductForm
            onSubmit={productoEditado ? actualizarProducto : agregarProducto}
            productoInicial={productoEditado}
            productos={productos}
          />
        </div>

        <div className="columna-der">
          <ProductList
            productos={productosFiltrados}
            onEditar={setProductoEditado}
            onEliminar={eliminarProducto}
          />
        </div>
      </div>
    </div>
  );
}
