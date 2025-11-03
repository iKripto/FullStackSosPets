import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PetPage from './pages/PetPage';
import PetForm from './pages/PetForm'; // 1. Importe o novo formulário
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/pets"
          element={
            isAuthenticated ? <PetPage /> : <Navigate to="/login" replace />
          }
        />
        
        {/* 2. ADICIONE A ROTA PARA O FORMULÁRIO */}
        <Route
          path="/pets/novo"
          element={
            isAuthenticated ? <PetForm /> : <Navigate to="/login" replace />
          }
        />
        
        {/* Adicione outras rotas (Tutores, Clínicas, etc.) aqui no futuro */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;