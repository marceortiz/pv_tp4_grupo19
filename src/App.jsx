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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Gestor de Productos
          </h1>
          <p className="text-gray-600">
            Administra tu inventario de productos de manera eficiente
          </p>
        </div>

        {/* Botón para mostrar/ocultar formulario */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
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
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{products.length}</div>
              <div className="text-gray-600">Total de Productos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {filteredProducts.length}
              </div>
              <div className="text-gray-600">Productos Mostrados</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {products.filter(p => p.stock === 0).length}
              </div>
              <div className="text-gray-600">Sin Stock</div>
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