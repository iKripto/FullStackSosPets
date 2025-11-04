import React from 'react';
import { Link } from 'react-router-dom';
import { GitHub, User, Home, FileText, Heart, PlusSquare } from 'react-feather';
import backgroundImage from '../assets/doguinhos.png'; // Importa a mesma imagem do login [cite: ikripto/curricularizacaofrontend/CurricularizacaoFrontend-e56dfb5337648cc871fc187f8e920a46a724fe1c/src/assets/doguinhos.png]
import logo from './logo.png'; // Sua logo importada
import './HomePage.css'; // [cite: ikripto/curricularizacaofrontend/CurricularizacaoFrontend-e56dfb5337648cc871fc187f8e920a46a724fe1c/src/pages/HomePage.css]

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        {/* Imagem da logo corrigida */}
        <img src={logo} alt="SOS Pets Logo" className="home-logo" />
      </header>

      {/* Passa a imagem de fundo via 'style' */}
      <main className="home-grid" style={{ backgroundImage: `url(${backgroundImage})` }}>
        
        {/* Usa o ícone 'GitHub' para 'Pet' */}
        <Link to="/pets" className="menu-card">
          <GitHub size={48} /> 
          <span>Pet</span>
        </Link>

        {/* Link para a página de Tutores */}
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