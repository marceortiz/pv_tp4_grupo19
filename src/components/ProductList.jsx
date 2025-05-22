import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, onEdit, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="text-center" style={{ padding: '2rem 0', color: '#6b7280' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📦</div>
        <p>No hay productos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3">
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;