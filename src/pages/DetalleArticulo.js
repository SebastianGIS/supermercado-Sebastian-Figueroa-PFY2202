import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSupermercado } from '../context/SupermercadoContext';

function DetalleArticulo() {
  // 1. Extraemos el parámetro dinámico de la URL (el ID)
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. Traemos el inventario y la función de agregar al carrito desde nuestro estado global
  const { inventario, agregarAlCarrito } = useSupermercado();

  // 3. Buscamos el producto exacto (useParams devuelve un texto, así que usamos parseInt para convertirlo a número)
  const producto = inventario.find(item => item.id === parseInt(id));

  // Manejo de error por si el usuario ingresa una URL con un ID que no existe
  if (!producto) {
    return (
      <div className="text-center mt-16">
        <h2 className="text-3xl text-gray-800 font-bold mb-4">Producto no encontrado</h2>
        <p className="text-gray-500 mb-6">El artículo que buscas no existe o fue eliminado.</p>
        <Link to="/" className="btn-primary">Volver al Inventario</Link>
      </div>
    );
  }

  // 4. Manejador para el botón de compra
  const handleAgregar = () => {
    agregarAlCarrito(producto);
    // Redirigimos al usuario al carrito para que vea su producto agregado
    navigate('/carrito');
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-800">{producto.nombre}</h2>
        <span className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full">
          {producto.tipo}
        </span>
      </div>

      <div className="space-y-4 text-gray-700 mb-8">
        <p className="text-lg">
          <span className="font-semibold text-gray-900">Marca:</span> {producto.marca}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-gray-900">Precio:</span> ${producto.precio.toLocaleString('es-CL')}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-gray-900">Stock disponible en bodega:</span> 
          {/* Renderizado condicional del color según la disponibilidad */}
          <span className={`ml-2 font-bold ${producto.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {producto.stock > 0 ? `${producto.stock} unidades` : 'Agotado'}
          </span>
        </p>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button 
          onClick={() => navigate('/')}
          className="text-gray-500 hover:text-gray-800 font-medium transition"
        >
          &larr; Volver al Catálogo
        </button>
        
        {/* Renderizado condicional que bloquea el botón si no hay stock */}
        <button 
          onClick={handleAgregar}
          disabled={producto.stock <= 0}
          className={`px-6 py-3 rounded-md text-white font-bold shadow-md transition ${
            producto.stock > 0 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {producto.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
        </button>
      </div>
    </div>
  );
}

export default DetalleArticulo;