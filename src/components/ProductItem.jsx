const ProductItem = ({ producto, onDelete, onEdit }) => {
	return (
		<tr className="producto-item">
			<td>{producto.descripcion}</td>
			<td>${producto.precio.toFixed(2)}</td>
			<td>% {producto.descuento}</td>
			<td>${(producto.precio * (1 - producto.descuento / 100)).toFixed(2)}</td>
			<td>{producto.stock}</td>
			<td>
				<button
					className="btn-editar"
					type="button"
					onClick={() => onEdit(producto)}
				>
					Editar
				</button>

				<button
					className="btn-eliminar"
					type="button"
					onClick={() => onDelete(producto.id)}
				>
					Eliminar
				</button>
			</td>
		</tr>
	);
};

export default ProductItem;