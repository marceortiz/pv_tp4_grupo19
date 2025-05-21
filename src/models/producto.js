export function crearProducto(data, id) {
	return {
		id,
		descripcion: data.descripcion,
		precio: Number.parseFloat(data.precio),
		stock: Number.parseInt(data.stock),
		descuento: data.descuento || 0,
	};
}