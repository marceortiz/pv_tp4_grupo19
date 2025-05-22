import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const ProductItem = ({ product, onEdit, onDelete }) => {
  const precioConDescuento = product.precioUnitario * (1 - product.descuento / 100);
  
  return (
    <div className="product-item">
      <div className="flex justify-between items-center mb-4">
        <div style={{ flex: 1 }}>
          <div className="flex items-center gap-2 mb-2">
            <span style={{ 
              fontSize: '0.75rem', 
              backgroundColor: '#f3f4f6', 
              color: '#6b7280', 
              padding: '0.25rem 0.5rem', 
              borderRadius: '0.25rem' 
            }}>
              ID: {product.id}
            </span>
            <span style={{ 
              fontSize: '0.75rem', 
              backgroundColor: product.stock > 0 ? '#dcfce7' : '#fee2e2',
              color: product.stock > 0 ? '#166534' : '#991b1b',
              padding: '0.25rem 0.5rem', 
              borderRadius: '0.25rem' 
            }}>
              Stock: {product.stock}
            </span>
          </div>
          <h4 className="font-bold mb-2">{product.descripcion}</h4>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            style={{ 
              padding: '0.25rem', 
              color: '#2563eb', 
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#eff6ff'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            title="Editar producto"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            style={{ 
              padding: '0.25rem', 
              color: '#dc2626', 
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#fef2f2'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            title="Eliminar producto"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
        <div>
          <span style={{ color: '#6b7280' }}>Precio original:</span>
          <div className="font-bold">${product.precioUnitario.toFixed(2)}</div>
        </div>
        <div>
          <span style={{ color: '#6b7280' }}>Descuento:</span>
          <div className="font-bold" style={{ color: '#ea580c' }}>{product.descuento}%</div>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <span style={{ color: '#6b7280' }}>Precio final:</span>
          <div className="font-bold text-lg" style={{ color: '#16a34a' }}>
            ${precioConDescuento.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;