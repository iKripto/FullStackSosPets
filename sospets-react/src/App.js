import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PetPage from './pages/PetPage';
import PetForm from './pages/PetForm';
import TutorPage from './pages/TutorPage';
import TutorForm from './pages/TutorForm'; // 1. Importar o novo formulário de Tutor

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* --- Rotas de Login e Home --- */}
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

        {/* --- Rotas de Pets (CRUD Completo) --- */}
        <Route
          path="/pets"
          element={
            isAuthenticated ? <PetPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/pets/novo"
          element={
            isAuthenticated ? <PetForm /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/pets/editar/:id"
          element={
            isAuthenticated ? <PetForm /> : <Navigate to="/login" replace />
          }
        />
        
        {/* --- 2. ROTAS DE TUTORES (CRUD COMPLETO) --- */}
        <Route
          path="/tutores"
          element={
            isAuthenticated ? <TutorPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/tutores/novo"
          element={
            isAuthenticated ? <TutorForm /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/tutores/editar/:cpf"
          element={
            isAuthenticated ? <TutorForm /> : <Navigate to="/login" replace />
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;