import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HackatonLogo from '../../assets/hackaton-logo.png';

const NavbarGames = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <img src={HackatonLogo} alt="logo-hackaton-utn" style={{ width: '3%', height: 'auto', marginRight: '10px' }} />
        <Link className="navbar-brand fw-bold" to="/">UTN - Hackaton</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-3">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/conversor" style={{ transition: '0.3s' }}>
                <i className="bi bi-file-earmark-arrow-up"></i> Importar Archivo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/bandeja" style={{ transition: '0.3s' }}>
                <i className="bi bi-eye"></i> Visualizar Datos de Archivo
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <style>
        {`
          .nav-link:hover {
            background-color: #28a745;
            color: white !important;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(40, 167, 69, 0.7);
          }
        `}
      </style>
    </nav>
  );
};

export default NavbarGames;
