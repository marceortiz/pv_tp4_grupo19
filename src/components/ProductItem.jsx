import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const ProductItem = ({ product, onEdit, onDelete }) => {
  const precioConDescuento = product.precioUnitario * (1 - product.descuento / 100);
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              ID: {product.id}
            </span>
            <span className={`text-xs px-2 py-1 rounded ${
              product.stock > 0 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              Stock: {product.stock}
            </span>
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">{product.descripcion}</h4>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
            title="Editar producto"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="p-1 text-red-600 hover:bg-red-50 rounded"
            title="Eliminar producto"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Precio original:</span>
          <div className="font-medium">${product.precioUnitario.toFixed(2)}</div>
        </div>
        <div>
          <span className="text-gray-500">Descuento:</span>
          <div className="font-medium text-orange-600">{product.descuento}%</div>
        </div>
        <div className="col-span-2">
          <span className="text-gray-500">Precio final:</span>
          <div className="font-bold text-green-600 text-lg">
            ${precioConDescuento.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;