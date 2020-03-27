import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from './../../assets/logo.svg';

import api from './../../services/api';

import './styles.css';

const Profile = () => {
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  console.log('ongId inicio', ongId);
  const [incidents, setIncidents] = useState([]);

  // Load inicdents
  useEffect(() => {
    api
      .get('/profile', {
        headers: {
          Authorization: ongId,
        },
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ongId]);

  // Delete incident
  const handleDeleteIncident = async id => {
    console.log('id++', id);
    try {
      await api.delete(`incidents/${id}`, {
        headers: { Authorization: ongId },
      });

      setIncidents(incidents.filter(incident => incident.id !== id));

      //
    } catch (err) {
      console.log(err);
      alert('Erro ao delete incident. Tente novamente');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ongId');
    localStorage.removeItem('ongName');
    history.push('/');
  };
  //
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASOS:</strong>
            <p>{incident.title}</p>
            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>
            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </p>
            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>

      {/* <ul>
        <li>
          <strong>CASOS:</strong>
          <p>Caso teste</p>

          <strong>DESCRIÇÃO:</strong>
          <p>Descrição teste</p>

          <strong>VALOR:</strong>
          <p>R$ 120,00</p>
          <button type="button">
            <FiTrash2 size={20} color="#a8a8b3" />
          </button>
        </li>
      </ul> */}
    </div>
  );
};

export default Profile;
