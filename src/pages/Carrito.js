import React from 'react';
import { Link } from 'react-router-dom';
import { useSupermercado } from '../context/SupermercadoContext';

function Carrito() {
  // 1. Extraemos todo lo necesario de nuestro Estado Global
  const { 
    carrito, 
    inventario, 
    modificarCantidadCarrito, 
    eliminarDelCarrito 
  } = useSupermercado();

  // 2. Calculamos el total a pagar iterando el carrito con .reduce()
  const totalPagar = carrito.reduce(
    (acumulador, item) => acumulador + (item.precio * item.cantidad), 
    0
  );

  // 3. Renderizado Condicional: ¿Qué pasa si el carrito está vacío?
  if (carrito.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-16 bg-white p-10 rounded-lg shadow-md text-center border border-gray-100">
        <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-6">Aún no has agregado ningún producto del supermercado.</p>
        <Link to="/" className="btn-primary">
          Ir al Catálogo de Inventario
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Tu Carrito de Compras</h2>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {carrito.map((item) => {
            // Buscamos el producto en el inventario para saber cuánto stock le queda en tiempo real
            const productoOriginal = inventario.find(p => p.id === item.id);
            const sinStock = productoOriginal ? productoOriginal.stock <= 0 : true;

            return (
              <li key={item.id} className="p-6 flex flex-col sm:flex-row justify-between items-center hover:bg-gray-50 transition">
                
                {/* Información del Producto */}
                <div className="flex-1 mb-4 sm:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800">{item.nombre}</h3>
                  <p className="text-sm text-gray-500">Marca: {item.marca} | Tipo: {item.tipo}</p>
                  <p className="text-blue-600 font-bold mt-1">
                    ${item.precio.toLocaleString('es-CL')} c/u
                  </p>
                </div>

                {/* Controles de Cantidad */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    {/* Botón Disminuir (Resta 1) */}
                    <button 
                      onClick={() => modificarCantidadCarrito(item.id, -1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition"
                    >
                      −
                    </button>
                    
                    <span className="px-4 font-semibold text-gray-800 border-x border-gray-300">
                      {item.cantidad}
                    </span>
                    
                    {/* Botón Aumentar (Suma 1) - Se bloquea si no hay más stock en la bodega */}
                    <button 
                      onClick={() => modificarCantidadCarrito(item.id, 1)}
                      disabled={sinStock}
                      className={`px-3 py-1 transition ${
                        sinStock ? 'text-gray-300 cursor-not-allowed bg-gray-50' : 'text-gray-600 hover:bg-gray-200'
                      }`}
                      title={sinStock ? 'Sin stock disponible' : 'Aumentar cantidad'}
                    >
                      +
                    </button>
                  </div>

                  <div className="w-24 text-right font-bold text-gray-800">
                    ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                  </div>

                  {/* Botón Eliminar por completo */}
                  <button 
                    onClick={() => eliminarDelCarrito(item.id)}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition"
                    title="Eliminar producto"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        
        {/* Resumen Total */}
        <div className="bg-gray-50 p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <span className="text-gray-600 text-lg mb-4 sm:mb-0">
            Total de artículos: <span className="font-bold">{carrito.reduce((acc, i) => acc + i.cantidad, 0)}</span>
          </span>
          <div className="flex items-center space-x-6">
            <span className="text-2xl font-extrabold text-gray-900">
              Total: ${totalPagar.toLocaleString('es-CL')}
            </span>
            <button className="bg-green-600 text-white px-6 py-3 rounded-md font-bold hover:bg-green-700 transition shadow-md">
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;