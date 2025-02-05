import React from 'react';
import { useNavigate } from 'react-router-dom';
import gamesServices from '../../../services/gamesServices.service';

const TablaRegistros = ({ juegos, cargarTablaDatos }) => {
  const navigate = useNavigate();

  const handleDelete = async (gameId) => {
    try {
      await gamesServices.deleteGamePorId(gameId);
      cargarTablaDatos(); // Actualiza la tabla después de borrar el juego
    } catch (error) {
      console.error('Error al borrar el juego:', error);
    }
  };

  if (!Array.isArray(juegos) || juegos.length === 0) {
    return <p>No hay juegos disponibles.</p>;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Sitio Web</th>
          <th>Slug</th>
          <th>Rating</th>
          <th>Fecha de Lanzamiento</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {juegos.map((juego, index) => (
          <tr key={index}>
            <td>{juego.id}</td>
            <td>{juego.name}</td>
            <td>{juego.website}</td>
            <td>{juego.slug}</td>
            <td>{juego.esrbRating}</td>
            <td>{juego.released}</td>
            <td>
              <button
                className="btn btn-warning me-2"
                onClick={() => navigate(`/actualizar-registro/${juego.id}`)}
              >
                Actualizar
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(juego.id)}>
                Borrar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaRegistros;
