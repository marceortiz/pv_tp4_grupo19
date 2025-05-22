import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, onEdit, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">📦</div>
        <p>No hay productos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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