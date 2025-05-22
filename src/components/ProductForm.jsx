import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

const ProductForm = ({ product, onSave, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    descripcion: '',
    precioUnitario: '',
    descuento: '',
    stock: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        descripcion: product.descripcion,
        precioUnitario: product.precioUnitario.toString(),
        descuento: product.descuento.toString(),
        stock: product.stock.toString()
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Validaciones básicas
    if (!formData.descripcion.trim()) {
      alert('La descripción es requerida');
      return;
    }
    
    const precioUnitario = parseFloat(formData.precioUnitario);
    const descuento = parseFloat(formData.descuento);
    const stock = parseInt(formData.stock);
    
    if (isNaN(precioUnitario) || precioUnitario < 0) {
      alert('El precio unitario debe ser un número válido mayor o igual a 0');
      return;
    }
    
    if (isNaN(descuento) || descuento < 0 || descuento > 100) {
      alert('El descuento debe ser un número entre 0 y 100');
      return;
    }
    
    if (isNaN(stock) || stock < 0) {
      alert('El stock debe ser un número entero mayor o igual a 0');
      return;
    }

    const productData = {
      descripcion: formData.descripcion.trim(),
      precioUnitario,
      descuento,
      stock
    };

    onSave(productData);
    
    // Limpiar formulario si no está editando
    if (!isEditing) {
      setFormData({
        descripcion: '',
        precioUnitario: '',
        descuento: '',
        stock: ''
      });
    }
  };

  return (
    <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        {isEditing ? 'Modificar Producto' : 'Agregar Nuevo Producto'}
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio Unitario ($)
            </label>
            <input
              type="number"
              name="precioUnitario"
              value={formData.precioUnitario}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descuento (%)
            </label>
            <input
              type="number"
              name="descuento"
              value={formData.descuento}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        <div className="flex gap-2 justify-end">
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isEditing ? 'Guardar Cambios' : 'Agregar Producto'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;