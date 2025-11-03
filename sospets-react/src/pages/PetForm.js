import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home } from 'react-feather';
import './PetForm.css'; // Vamos criar este CSS

// Este formulário segue o Fluxo Alternativo A1 
const PetForm = () => {
  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [porte, setPorte] = useState('0'); // 0: PEQUENO, 1: MÉDIO, 2: GRANDE
  const [dataNascimento, setDataNascimento] = useState('');
  const [eFilhote, setEFilhote] = useState(false);
  const [especie, setEspecie] = useState('0'); // 0: CACHORRO, 1: GATO
  const [sexo, setSexo] = useState('0'); // 0: FÊMEA, 1: MACHO
  const [statusAcolhimento, setStatusAcolhimento] = useState(true);
  const [corId, setCorId] = useState('');
  const [tutorCpf, setTutorCpf] = useState('');

  // Estados para carregar os dropdowns
  const [cores, setCores] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Busca dados de Cores e Tutores da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coresRes, tutoresRes] = await Promise.all([
          fetch('http://localhost:8080/cor'),
          fetch('http://localhost:8080/tutores')
        ]);
        setCores(await coresRes.json());
        setTutores(await tutoresRes.json());
      } catch (err) {
        setError('Falha ao carregar dados de cores e tutores.');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Monta o objeto Animal para enviar à API
    // Conforme Animal.java
    const animalData = {
      nome,
      raca,
      porte: parseInt(porte, 10),
      dataNascimento,
      eFilhote,
      especie: parseInt(especie, 10),
      sexo: parseInt(sexo, 10),
      statusAcolhimento,
      cor: { id: parseInt(corId, 10) }, // Envia um objeto Cor aninhado
      tutor: tutorCpf ? { cpf: tutorCpf } : null // Envia um objeto Tutor aninhado (ou null)
    };

    try {
      const response = await fetch('http://localhost:8080/animais', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(animalData),
      });

      if (!response.ok) {
        throw new Error('Falha ao cadastrar o animal.');
      }

      // Sucesso
      navigate('/pets'); // Volta para a lista de pets

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="pet-form-container">
      <header className="pet-header">
        <Link to="/pets" className="back-link">
          <Home size={18} /> Voltar para Pets
        </Link>
        <h1>Cadastrar Novo Animal</h1>
      </header>

      {error && <p className="form-error">{error}</p>}

      <form className="pet-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="raca">Raça</label>
          <input id="raca" type="text" value={raca} onChange={(e) => setRaca(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input id="dataNascimento" type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="especie">Espécie</label>
          <select id="especie" value={especie} onChange={(e) => setEspecie(e.target.value)}>
            <option value="0">Cachorro</option>
            <option value="1">Gato</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sexo">Sexo</label>
          <select id="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)}>
            <option value="0">Fêmea</option>
            <option value="1">Macho</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="porte">Porte</label>
          <select id="porte" value={porte} onChange={(e) => setPorte(e.target.value)}>
            <option value="0">Pequeno</option>
            <option value="1">Médio</option>
            <option value="2">Grande</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="cor">Cor</label>
          <select id="cor" value={corId} onChange={(e) => setCorId(e.target.value)} required>
            <option value="">Selecione uma cor</option>
            {cores.map(cor => (
              <option key={cor.id} value={cor.id}>{cor.descricao}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tutor">Tutor (Opcional)</label>
          <select id="tutor" value={tutorCpf} onChange={(e) => setTutorCpf(e.target.value)}>
            <option value="">Sem tutor (acolhido pela ONG)</option>
            {tutores.map(tutor => (
              <option key={tutor.cpf} value={tutor.cpf}>{tutor.nome}</option>
            ))}
          </select>
        </div>

        <div className="form-group-checkbox">
          <label htmlFor="eFilhote">
            <input id="eFilhote" type="checkbox" checked={eFilhote} onChange={(e) => setEFilhote(e.target.checked)} />
            É filhote?
          </label>
          
          <label htmlFor="statusAcolhimento">
            <input id="statusAcolhimento" type="checkbox" checked={statusAcolhimento} onChange={(e) => setStatusAcolhimento(e.target.checked)} />
            Status Acolhimento Ativo?
          </label>
        </div>

        <button type="submit" className="btn-salvar">Salvar Animal</button>
      </form>
    </div>
  );
};

export default PetForm;