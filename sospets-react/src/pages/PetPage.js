import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Plus, Trash2, Edit2 } from 'react-feather'; // Importa os ícones de Ação
import './Pet.css'; // Importa o CSS [cite: ikripto/curricularizacaofrontend/CurricularizacaoFrontend-e56dfb5337648cc871fc187f8e920a46a724fe1c/src/pages/Pet.css]

// Este componente é baseado no protótipo: image_f672c6.png
const PetPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapeia os enums do backend para texto
  const sexoMap = { 0: 'Fêmea', 1: 'Macho' };
  const especieMap = { 0: 'Cachorro', 1: 'Gato' };

  // Busca os animais do backend ao carregar a página
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:8080/animais');
        if (!response.ok) {
          throw new Error('Falha ao buscar dados dos pets.');
        }
        const data = await response.json();
        setPets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []); // O array vazio [] faz isso rodar apenas uma vez

  // Função para Deletar (Fluxo A4 da documentação)
  const handleDelete = async (id) => {
    // "O sistema pergunta ao usuário 'Tem certeza que deseja excluir esse item?'" [cite: Curricularização SOS Pets-1.pdf, page 14]
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      setError(null); // Limpa erros anteriores
      try {
        const response = await fetch(`http://localhost:8080/animais/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Falha ao excluir o animal.');
        }

        // Remove o pet da lista local para atualizar a UI
        setPets(pets.filter(pet => pet.id !== id));

      } catch (err) {
        setError(err.message);
      }
    }
  };


  if (loading) return <div>Carregando...</div>;

  return (
    <div className="pet-page-container">
      <header className="pet-header">
        <Link to="/" className="back-link">
          <Home size={18} /> Voltar ao Menu
        </Link>
        <h1>Listagem de Pets</h1>
        {/* Link para CADASTRAR (Fluxo A1) */}
        <Link to="/pets/novo" className="btn-cadastrar">
          <Plus size={16} /> CADASTRAR
        </Link>
      </header>

      {/* Exibe erros (de listagem ou exclusão) */}
      {error && <p className="form-error">{error}</p>}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>CÓDIGO</th>
              <th>NOME</th>
              <th>ESPÉCIE</th>
              <th>COR</th>
              <th>FILHOTE</th>
              <th>SEXO</th>
              <th>DATA DE NASCIMENTO</th>
              <th>TUTOR</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id}>
                <td>PET-{String(pet.id).padStart(3, '0')}</td>
                <td>{pet.nome}</td>
                <td>{especieMap[pet.especie]}</td>
                <td>{pet.cor ? pet.cor.descricao : 'N/A'}</td> 
                <td>{pet.eFilhote ? 'Sim' : 'Não'}</td>
                <td>{sexoMap[pet.sexo]}</td>
                {/* Adiciona timeZone: 'UTC' para evitar problemas de fuso horário com datas */}
                <td>{new Date(pet.dataNascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</td>
                <td>{pet.tutor ? pet.tutor.nome : 'Sem tutor'}</td>
                
                {/* Botões de Ação (Editar e Excluir) */}
                <td className="actions-cell">
                  {/* Link para EDITAR (Fluxo A3) */}
                  <Link 
                    to={`/pets/editar/${pet.id}`} 
                    className="btn-action btn-edit"
                  >
                    <Edit2 size={16} />
                  </Link>
                  
                  {/* Botão para EXCLUIR (Fluxo A4) */}
                  <button 
                    className="btn-action btn-delete"
                    onClick={() => handleDelete(pet.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PetPage;
