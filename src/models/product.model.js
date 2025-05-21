let contadorId = 0;

export class Producto {
  constructor({ descripcion, precioUnitario, descuento, stock }) {
    this.id = contadorId++;
    this.descripcion = descripcion;
    this.precioUnitario = precioUnitario;
    this.descuento = descuento;
    this.precioConDescuento = this.calcularPrecioConDescuento();
    this.stock = stock;
  }

  calcularPrecioConDescuento() {
    return this.precioUnitario * (1 - this.descuento / 100);
  }
}
