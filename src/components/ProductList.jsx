import ProductItem from "./ProductItem";
const ProductList = ({ productos, onDelete, onEdit }) => {
	return (
		<table className="tabla-productos">
			<thead>
				<tr>
					<th>Descripción</th>
					<th>Precio Unitario</th>
					<th>Descuento</th>
					<th>Precio Final</th>
					<th>Stock</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{productos.map((producto) => (
					<ProductItem
						key={producto.id}
						producto={producto}
						onDelete={onDelete}
						onEdit={onEdit}
					/>
				))}
			</tbody>
		</table>
	);
};

export default ProductList;