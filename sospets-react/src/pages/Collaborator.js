import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Plus, Trash2, Edit2 } from 'react-feather';
import './CollaboratorPage.css';

const CollaboratorPage = () => {
    return (
        <div className="collaborator-page">
            <h1>Bem-vindo à Página do Colaborador</h1>
            <p>Esta é a página dedicada ao usuário.</p>
        </div>
    );
}

export default CollaboratorPage;