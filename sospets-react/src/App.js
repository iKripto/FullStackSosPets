import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PetPage from './pages/PetPage';
import PetForm from './pages/PetForm'; // Importa o novo formulário
import TutorPage from './pages/TutorPage';
import ClinicPage from './pages/ClinicPage';
import CollaboratorPage from './pages/Collaborator';
import ReportsPage from './pages/ReportsPage';
import ServicePage from './pages/ServicePage';
import './App.css';

function App() {
  // 1. Criamos um estado simples para saber se o usuário está logado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 2. Esta função será chamada pelo LoginPage quando o login for um sucesso
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* --- Rota de Login --- */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace /> // Se já está logado, vai para o Home
            ) : (
              <LoginPage onLoginSuccess={handleLoginSuccess} /> // Passa a função de callback
            )
          }
        />

        {/* --- Rota Home (Menu Principal) --- */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <HomePage /> // Página principal (Menu)
            ) : (
              <Navigate to="/login" replace /> // Se não está logado, volta para Login
            )
          }
        />

        {/* --- Rota de Listagem de Pets --- */}
        <Route
          path="/pets"
          element={
            isAuthenticated ? (
              <PetPage /> // Página de listagem de Pets
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* --- Rota de CADASTRO de Pet --- */}
        <Route
          path="/pets/novo"
          element={
            isAuthenticated ? (
              <PetForm /> // Usa o mesmo formulário
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* --- Rota de EDIÇÃO de Pet --- */}
        <Route
          path="/pets/editar/:id"
          element={
            isAuthenticated ? (
              <PetForm /> // Usa o mesmo formulário
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/tutores"
          element={
            isAuthenticated ? (
              <TutorPage /> // Página de listagem de Pets
            ) : (
              <Navigate to="/login" replace />
            )
          }        
        />


        <Route
          path="/clinicas"
          element={
            isAuthenticated ? (
              <ClinicPage /> // Página de listagem de Clínicas
            ) : (
              <Navigate to="/login" replace />
            )
          }        
        />


        <Route
          path="/colaboradores"
          element={
            isAuthenticated ? (
              <CollaboratorPage /> // Página de listagem de Colaboradores
            ) : (
              <Navigate to="/login" replace />
            )
          }        
        />

        <Route
          path="/relatorios"
          element={
            isAuthenticated ? (
              <ReportsPage /> // Página de listagem de Relatórios
            ) : (
              <Navigate to="/login" replace />
            )
          }        
        />

        <Route
          path="/atendimentos"
          element={
            isAuthenticated ? (
              <ServicePage /> // Página de listagem de Atendimentos
            ) : (
              <Navigate to="/login" replace />
            )
          }        
        />



        {/* Adicione outras rotas (Tutores, Clínicas, etc.) aqui no futuro */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;