import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gamesServices from '../../services/gamesServices.service';
import ratingsServices from '../../services/ratingsServices.service';
import TablaRegistros from './TablaRegistros/TablaRegistros';

const ConsultaRegistros = () => {
  const navigate = useNavigate();
  const [juegos, setJuegos] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [ratingSeleccionado, setRatingSeleccionado] = useState('');

  const fetchData = async (filter = '', rating = '') => {
    try {
      if (!filter.trim() && !rating.trim()) {
        const responseJuegos = await gamesServices.getAllGames();
        setJuegos(Array.isArray(responseJuegos) ? responseJuegos.slice(0, 15) : []);
      } else {
        const responseJuegos = await gamesServices.getGamesByFilter(filter, rating);
        setJuegos(Array.isArray(responseJuegos) ? responseJuegos : []);
      }

      const responseRatings = await ratingsServices.getAllRatingsConsulta();
      setRatings(responseRatings);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFiltrar = () => {
    if (filtro.trim() || ratingSeleccionado.trim()) {
      fetchData(filtro, ratingSeleccionado);
    } else {
      fetchData();
    }
  };

  return (
    <div className="container">
      <h1>Lista de Juegos</h1>
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Filtro"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <select
          className="form-select me-2"
          value={ratingSeleccionado}
          onChange={(e) => setRatingSeleccionado(e.target.value)}
        >
          <option value="">Seleccione un rating</option>
          {ratings.map((rating, index) => (
            <option key={index} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        <button className="btn btn-primary" onClick={handleFiltrar}>
          Filtrar
        </button>
        <button
          className="btn btn-secondary ms-2"
          onClick={() => navigate('/nuevo-juego')}
        >
          Agregar Juego
        </button>
      </div>
      <TablaRegistros juegos={juegos} cargarTablaDatos={fetchData} />
    </div>
  );
};

export default ConsultaRegistros;
