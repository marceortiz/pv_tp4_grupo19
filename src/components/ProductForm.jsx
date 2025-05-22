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
    <div className="card mb-6">
      <h3 className="text-lg font-bold mb-4">
        {isEditing ? 'Modificar Producto' : 'Agregar Nuevo Producto'}
      </h3>
      
      <div>
        <div className="form-group">
          <label className="form-label">
            Descripción
          </label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        
        <div className="grid grid-cols-3">
          <div className="form-group">
            <label className="form-label">
              Precio Unitario ($)
            </label>
            <input
              type="number"
              name="precioUnitario"
              value={formData.precioUnitario}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Descuento (%)
            </label>
            <input
              type="number"
              name="descuento"
              value={formData.descuento}
              onChange={handleChange}
              min="0"
              max="100"
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className="form-input"
              required
            />
          </div>
        </div>
        
        <div className="flex gap-2" style={{ justifyContent: 'flex-end' }}>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              <X size={16} />
              Cancelar
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            <Save size={16} />
            {isEditing ? 'Guardar Cambios' : 'Agregar Producto'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;