import React from 'react';
import { Link } from 'react-router-dom';
// Importa o 'GitHub' no lugar de 'PawPrint' e a imagem de fundo
import { GitHub, User, Home, FileText, Heart, PlusSquare } from 'react-feather';
import backgroundImage from '../assets/doguinhos.png'; // Importa a mesma imagem do login
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        {/* Adicione sua logo na pasta public/ e descomente a linha abaixo */}
        {/* <img src="/logo-sospets.png" alt="SOS Pets Logo" className="home-logo" /> */}
        <h2>SOS Pets</h2> {/* Placeholder enquanto não tem logo */}
        <div className="search-bar">
          <input type="text" placeholder="Pesquisar..." />
        </div>
      </header>

      {/* Passa a imagem de fundo via 'style' */}
      <main className="home-grid" style={{ backgroundImage: `url(${backgroundImage})` }}>
        
        {/* Usa o ícone 'GitHub' para 'Pet' */}
        <Link to="/pets" className="menu-card">
          <GitHub size={48} /> 
          <span>Pet</span>
        </Link>

        <Link to="/tutores" className="menu-card">
          <User size={48} />
          <span>Tutor</span>
        </Link>
        
        <Link to="/clinicas" className="menu-card">
          <PlusSquare size={48} />
          <span>Clínicas</span>
        </Link>
        
        <Link to="/colaboradores" className="menu-card">
          <Home size={48} />
          <span>Colaboradores</span>
        </Link>

        <Link to="/relatorios" className="menu-card">
          <FileText size={48} />
          <span>Relatórios</span>
        </Link>

        <Link to="/atendimentos" className="menu-card">
          <Heart size={48} />
          <span>Atendimentos</span>
        </Link>
      </main>
    </div>
  );
};

export default HomePage;