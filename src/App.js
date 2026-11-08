import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { SupermercadoProvider } from './context/SupermercadoContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <SupermercadoProvider>
      <AppRoutes />
    </SupermercadoProvider>
  );
}

export default App;