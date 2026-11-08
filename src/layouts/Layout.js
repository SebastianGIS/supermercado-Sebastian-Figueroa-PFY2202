import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Menú de navegación fijo en todas las vistas */}
      <nav className="bg-gray-900 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold tracking-wide text-blue-400">
            Supermercado App
          </Link>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-blue-400 transition">Inventario</Link></li>
            <li><Link to="/ingresar" className="hover:text-blue-400 transition">Nuevo Artículo</Link></li>
            <li><Link to="/carrito" className="hover:text-blue-400 transition">Carrito</Link></li>
          </ul>
        </div>
      </nav>

      {/* El contenido de las páginas cambiará aquí dentro */}
      <main className="flex-grow p-6">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-gray-400 text-center py-4 text-sm mt-8">
        <p>2026 Supermercado Inventario - Desarrollo Frontend II</p>
      </footer>
    </div>
  );
}

export default Layout;