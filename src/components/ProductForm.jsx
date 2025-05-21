import { useState } from "react";
import { useEffect } from "react";

const ProductForm = ({
	addProducto,
	productosEditado,
	actualizarProducto,
	cancelarEdicion,
}) => {
	const [producto, setProducto] = useState({
		descripcion: "",
		precio: "",
		stock: "",
		descuento: "",
	});

	useEffect(() => {
		// Si hay un producto editado, establecerlo en el estado
		if (productosEditado) {
			setProducto(productosEditado);
		} else
			setProducto({ descripcion: "", precio: "", stock: "", descuento: "" });
	}, [productosEditado]);

	const ManejarSubmit = (e) => {
		e.preventDefault(); //esto es para evitar que se recargue la pagina

		// Validar los campos
		const precioNumerico = Number.parseFloat(producto.precio);
		const stockNumerico = Number.parseInt(producto.stock);
		const descuentoNumerico = Number.parseFloat(producto.descuento);
		if (
			producto.descripcion.toString().trim() === "" ||
			producto.precio === "" ||
			producto.stock === "" ||
			producto.descuento === ""
		) {
			alert("Por favor, complete todos los campos correctamente.");
			return;
		}
		if (precioNumerico <= 0 || stockNumerico <= 0 || descuentoNumerico < 0) {
			alert(
				"El precio, stock y descuento deben ser mayores a 0. Intente nuevamente.",
			);
			return;
		}

		// Verificar si el producto ya existe
		if (productosEditado) {
			actualizarProducto({
				...productosEditado,
				descripcion: producto.descripcion,
				precio: precioNumerico,
				stock: stockNumerico,
				descuento: descuentoNumerico,
			});
		} else {
			addProducto({
				...producto,
				precio: precioNumerico,
				stock: stockNumerico,
				descuento: descuentoNumerico,
			});
			cancelarEdicion();
		}
		// Reiniciar el formulario
		setProducto({ descripcion: "", precio: "", stock: "", descuento: "" });
	};

	return (
		<div>
			<h2>Ingreso de Productos</h2>
			<form onSubmit={ManejarSubmit}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Descripción"
						value={producto.descripcion}
						onChange={(e) =>
							setProducto({ ...producto, descripcion: e.target.value })
						}
						className="input-field"
					/>
				</div>
				<div className="form-group">
					<input
						type="number"
						placeholder="Precio"
						value={producto.precio}
						onChange={(e) =>
							setProducto({ ...producto, precio: e.target.value })
						}
						className="input-field"
					/>
				</div>
				<div className="form-group">
					<input
						type="number"
						placeholder="Stock"
						value={producto.stock}
						onChange={(e) =>
							setProducto({ ...producto, stock: e.target.value })
						}
						className="input-field"
					/>
				</div>
				<div className="form-group">
					<input
						type="number"
						placeholder="Descuento"
						value={producto.descuento}
						onChange={(e) =>
							setProducto({ ...producto, descuento: e.target.value })
						}
						className="input-field"
					/>
				</div>
				<button type="submit" className="btn-agregar">
					{productosEditado ? "Actualizar" : "Agregar"}
				</button>
				{productosEditado && (
					<button
						type="button"
						className="btn-cancelar"
						onClick={cancelarEdicion}
					>
						Cancelar
					</button>
				)}
			</form>
		</div>
	);
};

export default ProductForm;