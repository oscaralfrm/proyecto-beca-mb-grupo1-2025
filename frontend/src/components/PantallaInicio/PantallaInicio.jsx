import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import HackatonLogo from '../../assets/hackatonLogo.png';
import Slide1 from '../../assets/slide1.jpg';
import Slide2 from '../../assets/slide2.png';
import Slide3 from '../../assets/slide3.jpg';
import Conversor from '../../assets/conversor.png';
import Bandeja from '../../assets/bandeja.png';

const PantallaInicio = () => {
  return (
    <div className="container text-center mt-5">
      {/* Carrusel */}
      <div id="carouselExample" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-inner">
          {[Slide1, Slide2, Slide3].map((slide, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <div className="position-relative">
                <img
                  src={slide}
                  className="d-block w-100"
                  alt={`Slide ${index + 1}`}
                  style={{ height: '400px', objectFit: 'cover' }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-success" style={{ opacity: 0.4 }}></div>
              </div>
              <div className="carousel-caption d-none d-md-block bg-dark text-white p-3 rounded" style={{ opacity: 0.85 }}>
                {index === 0 && (
                  <>
                    <h5>Organización de Hackatones</h5>
                    <p>Aplicación creada por estudiantes de la UTN FRC para gestionar eventos de Hackaton en Argentina.</p>
                  </>
                )}
                {index === 1 && (
                  <>
                    <h5>Importar Archivos</h5>
                    <p>Utiliza nuestra herramienta para importar, procesar y exportar archivos fácilmente.</p>
                    <Link to="/conversor" className="btn btn-light">Ir al Conversor</Link>
                  </>
                )}
                {index === 2 && (
                  <>
                    <h5>Visualización en Bandeja</h5>
                    <p>Guarda la información procesada en la base de datos y realiza acciones sobre ella.</p>
                    <Link to="/bandeja" className="btn btn-light">Ver Bandeja</Link>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Descripción y tarjetas */}
      <div className="mb-5">
        <img src={HackatonLogo} alt="Descripción de la aplicación" className="img-fluid w-100" style={{ maxHeight: '250px', objectFit: 'contain' }} />
        <h1 className="mt-4">Conversión de Datos</h1>
        <p className="text-muted">Convierte tus archivos Excel al formato deseado y gestiona la información de manera eficiente.</p>
      </div>

      <div className="row justify-content-center gy-4"> {/* Added spacing with gy-4 */}
        <div className="col-md-4 col-10"> {/* Adjust responsive column sizes */}
          <div className="card text-center shadow-lg p-3 mb-5 rounded" style={{ backgroundColor: "#B5EAD7" }}>
            <img src={Conversor} alt="Conversor" className="card-img-top" style={{ height: '100px', objectFit: 'contain' }} /> {/* Smaller size */}
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title">Conversor</h5>
              <p className="card-text">Importa, procesa y exporta tus archivos Excel al formato deseado.</p>
              <Link to="/conversor" className="btn btn-success mt-auto btn-bright">Ir al Conversor</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-10"> {/* Adjust responsive column sizes */}
          <div className="card text-center shadow-lg p-3 mb-5 rounded" style={{ backgroundColor: "#B5EAD7" }}>
            <img src={Bandeja} alt="Visualización en Bandeja" className="card-img-top" style={{ height: '100px', objectFit: 'contain' }} /> {/* Smaller size */}
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title">Visualización en Bandeja</h5>
              <p className="card-text">Guarda la información procesada y realiza acciones con ella.</p>
              <Link to="/bandeja" className="btn btn-success mt-auto btn-bright">Ver Bandeja</Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-bright:hover {
          background-color: #2ecc71; /* Emerald Green */
          color: white;
          transition: background-color 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default PantallaInicio;