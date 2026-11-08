import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupermercado } from '../context/SupermercadoContext';

function Inventario() {
  // 1. Consumimos el inventario desde el estado global
  const { inventario } = useSupermercado();
  const navigate = useNavigate();

  // 2. Estado local para guardar la categoría seleccionada en el filtro
  const [filtro, setFiltro] = useState('');

  // 3. Filtrado dinámico (Estado derivado): Mantenemos intacto el arreglo original
  const inventarioFiltrado = filtro === '' 
    ? inventario 
    : inventario.filter(item => item.tipo === filtro);

  // Generamos una lista de categorías únicas para poblar el selector automáticamente
  const categoriasUnicas = [...new Set(inventario.map(item => item.tipo))];

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Catálogo de Inventario</h2>
        
        {/* 4. Selector para filtrar por categoría */}
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <label className="text-gray-600 font-medium">Filtrar por categoría:</label>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los productos</option>
            {categoriasUnicas.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 5. Tabla de productos */}
      {inventarioFiltrado.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No se encontraron productos en esta categoría.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="py-3 px-4 font-semibold text-sm uppercase">ID</th>
                <th className="py-3 px-4 font-semibold text-sm uppercase">Nombre</th>
                <th className="py-3 px-4 font-semibold text-sm uppercase">Marca</th>
                <th className="py-3 px-4 font-semibold text-sm uppercase">Categoría</th>
                <th className="py-3 px-4 font-semibold text-sm uppercase text-center">Stock</th>
                <th className="py-3 px-4 font-semibold text-sm uppercase text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {inventarioFiltrado.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 text-sm text-gray-500">{item.id}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">{item.nombre}</td>
                  <td className="py-3 px-4">{item.marca}</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      {item.tipo}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-600 text-center">{item.stock}</td>
                  <td className="py-3 px-4 text-center">
                    {/* Botón que navega a la ruta dinámica del detalle */}
                    <button
                      onClick={() => navigate(`/inventario/${item.id}`)}
                      className="btn-primary text-sm"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Inventario;