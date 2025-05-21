import { useState, useEffect } from "react";
import "./style.css";

export default function ProductForm({ onSubmit, productoInicial }) {
  const [producto, setProducto] = useState({
    descripcion: "",
    precioUnitario: "",
    descuento: "",
    stock: "",
  });

  useEffect(() => {
    if (productoInicial) {
      setProducto({
        descripcion: productoInicial.descripcion,
        precioUnitario: productoInicial.precioUnitario,
        descuento: productoInicial.descuento,
        stock: productoInicial.stock,
      });
    }
  }, [productoInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(producto);
    setProducto({
      descripcion: "",
      precioUnitario: "",
      descuento: "",
      stock: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <input
        name="descripcion"
        value={producto.descripcion}
        onChange={handleChange}
        placeholder="Descripción"
        required
      />
      <input
        name="precioUnitario"
        type="number"
        value={producto.precioUnitario}
        onChange={handleChange}
        placeholder="Precio Unitario"
        required
      />
      <input
        name="descuento"
        type="number"
        value={producto.descuento}
        onChange={handleChange}
        placeholder="Descuento %"
        required
      />
      <input
        name="stock"
        type="number"
        value={producto.stock}
        onChange={handleChange}
        placeholder="Stock"
        required
      />
      <button type="submit">
        {productoInicial ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
}
