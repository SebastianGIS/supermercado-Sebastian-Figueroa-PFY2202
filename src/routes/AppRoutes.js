import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../layouts/Layout';

// Lazy loading: Cargamos las vistas solo cuando el usuario entra a su URL
const Inventario = lazy(() => import('../pages/Inventario'));
const IngresarArticulo = lazy(() => import('../pages/IngresarArticulo'));
const DetalleArticulo = lazy(() => import('../pages/DetalleArticulo'));
const Carrito = lazy(() => import('../pages/Carrito'));

// Componente temporal mientras cargan las vistas
const Cargando = () => <div className="text-center mt-10 text-xl text-gray-500">Cargando vista...</div>;

function AppRoutes() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Suspense fallback={<Cargando />}>
        <Routes>
          {/* Ruta padre que aplica el Layout a todas las subrutas */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Inventario />} />
            <Route path="ingresar" element={<IngresarArticulo />} />
            <Route path="inventario/:id" element={<DetalleArticulo />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="*" element={<h2 className="text-center mt-10 text-2xl text-red-500">404 - Página no encontrada</h2>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;