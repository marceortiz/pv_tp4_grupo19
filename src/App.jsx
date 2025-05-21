import { useState, useEffect } from "react";
import "./index.css";
import { crearProducto } from "./models/producto";
import { filtrarProductos } from "./utils/productoUtils";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";

let contadorId = 0;
function App() {
	const [productos, setProductos] = useState([]); //lo defino como un array vacio es un array de arreglo de objetos
	const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda es solo un string
	const [productosEditados, setProductosEditados] = useState(null); // defino el estado para editar el producto
	const agregarProducto = (producto) => {
		const nuevoProducto = crearProducto(producto, contadorId++);
		setProductos((productos) => [...productos, nuevoProducto]);
	};
	//notifica cuando se cambie mis productos en consola
	useEffect(() => {
		console.log("El array de productos ha cambiado:", productos);
	}, [productos]);

	const eliminarProducto = (id) => {
		setProductos(productos.filter((producto) => producto.id !== id));
	};
	const editarProducto = (producto) => {
		setProductosEditados(producto);
	};

	//funcion para agregar un producto
	const actualizarProducto = (productoActualizado) => {
		setProductos((productos) =>
			productos.map((p) =>
				p.id === productoActualizado.id ? productoActualizado : p,
			),
		);
		setProductosEditados(null);
	};
	// Filtrar productos según el término de búsqueda
	const productosFiltrados = filtrarProductos(productos, searchTerm);
	return (
		<>
			<div>
				<h1>Gestor de Productos</h1>
				<div>
					<ProductForm
						addProducto={agregarProducto}
						productosEditado={productosEditados}
						actualizarProducto={actualizarProducto}
						cancelarEdicion={() => setProductosEditados(null)}
					/>
					<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
					<ProductList
						productos={productosFiltrados}
						onEdit={editarProducto}
						onDelete={eliminarProducto}
					/>
				</div>
			</div>
		</>
	);
}

export default App;
