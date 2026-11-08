import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupermercado } from '../context/SupermercadoContext';

function IngresarArticulo() {
  // 1. Estados locales para controlar los campos del formulario
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [tipo, setTipo] = useState('');
  const [stock, setStock] = useState('');
  const [precio, setPrecio] = useState('');
  const [error, setError] = useState('');

  // 2. Extraemos la función de agregar desde nuestro contexto global
  const { agregarArticuloInventario } = useSupermercado();
  const navigate = useNavigate();

  // 3. Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación para evitar productos vacíos
    if (!nombre.trim() || !marca.trim() || !tipo.trim() || !stock || !precio) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Despachamos el producto al estado global convirtiendo stock y precio a números
    agregarArticuloInventario({
      nombre: nombre.trim(),
      marca: marca.trim(),
      tipo: tipo.trim(),
      stock: parseInt(stock),
      precio: parseInt(precio)
    });

    // Redirigimos al catálogo (ruta raíz) para ver el producto recién creado
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Ingresar Nuevo Artículo
      </h2>

      {error && (
        <div className="mb-6 p-3 bg-red-100 text-red-700 border border-red-400 rounded-md text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Artículo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Aceite de Maravilla 1L"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
            <input
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Ej: Chef"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Producto</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Selecciona --</option>
              <option value="Lácteos">Lácteos</option>
              <option value="Abarrotes">Abarrotes</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Limpieza">Limpieza</option>
              <option value="Frutas y Verduras">Frutas y Verduras</option>
              <option value="Carnicería">Carnicería</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Inicial</label>
            <input
              type="number"
              min="1"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Ej: 50"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio Unitario ($)</label>
            <input
              type="number"
              min="1"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder="Ej: 1500"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button type="submit" className="w-full btn-primary mt-4 py-3 text-lg font-semibold">
          Guardar en Inventario
        </button>
      </form>
    </div>
  );
}

export default IngresarArticulo;