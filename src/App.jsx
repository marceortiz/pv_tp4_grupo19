import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Plus } from 'lucide-react';
import SearchBar from './components/SearchBar';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // useEffect para monitorear cambios en el array de productos
  useEffect(() => {
    console.log('Cambios en el array de productos:', products);
    console.log('Total de productos:', products.length);
  }, [products]);

  // useMemo para optimizar el filtrado de productos
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }
    
    const term = searchTerm.toLowerCase();
    return products.filter(product => 
      product.descripcion.toLowerCase().includes(term) ||
      product.id.toString().includes(term)
    );
  }, [products, searchTerm]);

  // useCallback para las funciones de manejo de productos
  const handleAddProduct = useCallback((productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      precioConDescuento: productData.precioUnitario * (1 - productData.descuento / 100)
    };
    
    setProducts(prev => [...prev, newProduct]);
    console.log('Producto agregado:', newProduct);
  }, []);

  const handleEditProduct = useCallback((productData) => {
    const updatedProduct = {
      ...editingProduct,
      ...productData,
      precioConDescuento: productData.precioUnitario * (1 - productData.descuento / 100)
    };
    
    setProducts(prev => 
      prev.map(product => 
        product.id === editingProduct.id ? updatedProduct : product
      )
    );
    
    setEditingProduct(null);
    console.log('Producto modificado:', updatedProduct);
  }, [editingProduct]);

  const handleDeleteProduct = useCallback((productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(prev => prev.filter(product => product.id !== productId));
      console.log('Producto eliminado con ID:', productId);
    }
  }, []);

  const handleStartEdit = useCallback((product) => {
    setEditingProduct(product);
    setShowForm(true);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingProduct(null);
    setShowForm(false);
  }, []);

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-4">
            Gestor de Productos
          </h1>
          <p style={{ color: '#6b7280' }}>
            Administra tu inventario de productos de manera eficiente
          </p>
        </div>

        {/* Botón para mostrar/ocultar formulario */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            <Plus size={16} />
            {showForm ? 'Ocultar Formulario' : 'Agregar Producto'}
          </button>
        </div>

        {/* Formulario de producto */}
        {showForm && (
          <ProductForm
            product={editingProduct}
            onSave={editingProduct ? handleEditProduct : handleAddProduct}
            onCancel={handleCancelEdit}
            isEditing={!!editingProduct}
          />
        )}

        {/* Barra de búsqueda */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        {/* Estadísticas */}
        <div className="card mb-6">
          <div className="grid grid-cols-3 text-center">
            <div>
              <div className="text-2xl font-bold" style={{ color: '#2563eb' }}>{products.length}</div>
              <div style={{ color: '#6b7280' }}>Total de Productos</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: '#16a34a' }}>
                {filteredProducts.length}
              </div>
              <div style={{ color: '#6b7280' }}>Productos Mostrados</div>
            </div>
            <div>
              <div className="text-2xl font-bold" style={{ color: '#ea580c' }}>
                {products.filter(p => p.stock === 0).length}
              </div>
              <div style={{ color: '#6b7280' }}>Sin Stock</div>
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        <ProductList
          products={filteredProducts}
          onEdit={handleStartEdit}
          onDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export default App;