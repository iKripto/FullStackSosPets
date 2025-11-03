import React, { useState, useEffect } from 'react'; // Define 'useState' e 'useEffect'
import { Link } from 'react-router-dom';             // Define 'Link'
import { Home, Plus } from 'react-feather';           // Define 'Home' e 'Plus'
import './Pet.css';

// Este componente é baseado no protótipo: image_9532e2.png
const PetPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);     // Define 'loading'
  const [error, setError] = useState(null);       // Define 'error'

  // Enum para Sexo (0 = FÊMEA, 1 = MACHO)
  const sexoMap = { 0: 'Fêmea', 1: 'Macho' };
  // Enum para Espécie (0 = CACHORRO, 1 = GATO)
  const especieMap = { 0: 'Cachorro', 1: 'Gato' };

  useEffect(() => {
    // Busca os animais do backend
    const fetchPets = async () => {
      try {
        // Endpoint do seu AnimalController.java
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

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="pet-page-container">
      <header className="pet-header">
        <Link to="/" className="back-link">
          <Home size={18} /> Voltar ao Menu
        </Link>
        <h1>Listagem de Pets</h1>
<Link to="/pets/novo" className="btn-cadastrar">
  <Plus size={16} /> CADASTRAR
</Link>
      </header>

      {/* Aqui recriamos a tabela do protótipo */}
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
              {/* <th>DATA DE CASTRAÇÃO</th> -- Adicionar este campo se existir no backend */}
              <th>TUTOR</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet.id}>
                <td>PET-{String(pet.id).padStart(3, '0')}</td>
                <td>{pet.nome}</td>
                <td>{especieMap[pet.especie]}</td>
                {/* O 'cor' é um objeto aninhado */}
                <td>{pet.cor ? pet.cor.descricao : 'N/A'}</td> 
                <td>{pet.filhote ? 'Sim' : 'Não'}</td>
                <td>{sexoMap[pet.sexo]}</td>
                <td>{new Date(pet.dataNascimento).toLocaleDateString()}</td>
                {/* O 'tutor' também é um objeto aninhado */}
                <td>{pet.tutor ? pet.tutor.nome : 'Sem tutor'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PetPage;