import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PetPage from './pages/PetPage';
import PetForm from './pages/PetForm'; // Já importado
import TutorPage from './pages/TutorPage';
// Outros imports que você possa ter
// import ClinicPage from './pages/ClinicPage'; 
// import CollaboratorPage from './pages/CollaboratorPage';
// import ReportsPage from './pages/ReportsPage';
// import ServicePage from './pages/ServicePage';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota de Login */}
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
        
        {/* Rota Home (Menu) */}
        <Route
          path="/"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />
          }
        />
        
        {/* --- Rotas de Pets --- */}
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
        {/* ROTA DE EDIÇÃO ADICIONADA */}
        <Route
          path="/pets/editar/:id"
          element={
            isAuthenticated ? <PetForm /> : <Navigate to="/login" replace />
          }
        />

        {/* --- Rotas de Tutores --- */}
        <Route
          path="/tutores"
          element={
            isAuthenticated ? <TutorPage /> : <Navigate to="/login" replace />
          }
        />
        {/* Você precisará adicionar as rotas /tutores/novo e /tutores/editar/:cpf aqui */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
