import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from './../../assets/logo.svg';

import api from './../../services/api';
import './styles.css';

const NewIncident = () => {
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  // const ongName = localStorage.getItem('ongName');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);

  //
  const handleNewIncident = async e => {
    e.preventDefault();
    const newIncident = {
      title,
      description,
      value,
    };
    try {
      await api.post('incidents', newIncident, {
        headers: {
          Authorization: ongId,
        },
      });

      //
      history.push('/profile');
      //
    } catch (err) {
      console.log(err);
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  };

  const handleCancelar = () => {
    setTitle('');
    setDescription('');
    setValue('');
    //
    history.push('/profile');
  };

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            type="text"
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <div className="btn-group">
            <button
              type="button"
              className="button"
              onClick={handleCancelar}
              style={{ backgroundColor: 'white', color: '#737380' }}
            >
              Cancelar
            </button>
            <button type="submit" className="button">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewIncident;
