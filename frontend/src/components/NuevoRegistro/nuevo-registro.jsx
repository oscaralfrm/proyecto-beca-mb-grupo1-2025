import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import gamesServices from '../../services/games-services.service';
import ratingsServices from '../../services/ratings-services.service';

const NuevoRegistro = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await ratingsServices.getAllRatingsRegistro();
        setRatings(response.data || []);
      } catch (error) {
        console.error('Error al obtener los ratings:', error);
        setRatings([]);
      }
    };

    fetchRatings();
  }, []);

  const checkSlugExists = async (slug) => {
    try {
      const juegos = await gamesServices.getAllGames();
      const existingSlug = juegos.some(juego => juego.slug === slug);
      return !existingSlug;
    } catch (error) {
      console.error('Error al verificar el slug:', error);
      return false;
    }
  };

  const onSubmit = async (data) => {
    const nuevoJuego = {
      slug: data.slug,
      name: data.name,
      metacritic: data.metacritic,
      released: data.released,
      updated: new Date().toISOString(), // Fecha actual en formato ISO
      website: data.website,
      playTime: data.playTime,
      raters: data.raters,
      platforms: data.platforms,
      developers: data.developers,
      genres: data.genres,
      publishers: data.publishers,
      esrbRating: data.esrbRating,
    };

    try {

        const slugAvailable = await checkSlugExists(data.slug);
        if (!slugAvailable) {
          throw new Error('El slug ya está en uso');
        }

      await gamesServices.postNuevoJuego(nuevoJuego); // Asegúrate de que el nombre de la función sea correcto
      navigate('/lista-juegos'); // Redirigir al componente Lista de juegos
    } catch (error) {
      console.error('Error al crear el juego:', error);
    }
  };

  return (
    <div className="container">
      <h1>Agregar un Nuevo Juego</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="slug" className="form-label">Slug</label>
          <input
            id="slug"
            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
            {...register('slug', { required: 'El slug es obligatorio' })}
          />
          {errors.slug && <div className="invalid-feedback">{errors.slug.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre</label>
          <input
            id="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            {...register('name', { required: 'El nombre es obligatorio' })}
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="metacritic" className="form-label">Metacritic</label>
          <input
            type="number"
            id="metacritic"
            className={`form-control ${errors.metacritic ? 'is-invalid' : ''}`}
            {...register('metacritic', { required: 'El metacritic es obligatorio', valueAsNumber: true })}
          />
          {errors.metacritic && <div className="invalid-feedback">{errors.metacritic.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="released" className="form-label">Fecha de Lanzamiento</label>
          <input
            type="date"
            id="released"
            className={`form-control ${errors.released ? 'is-invalid' : ''}`}
            {...register('released', { required: 'La fecha de lanzamiento es obligatoria' })}
          />
          {errors.released && <div className="invalid-feedback">{errors.released.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="website" className="form-label">Sitio Web</label>
          <input
            id="website"
            className={`form-control ${errors.website ? 'is-invalid' : ''}`}
            {...register('website', { required: 'El sitio web es obligatorio', pattern: { value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, message: 'URL no válida' } })}
          />
          {errors.website && <div className="invalid-feedback">{errors.website.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="playTime" className="form-label">Tiempo de Juego (horas)</label>
          <input
            type="number"
            id="playTime"
            className={`form-control ${errors.playTime ? 'is-invalid' : ''}`}
            {...register('playTime', { required: 'El tiempo de juego es obligatorio', valueAsNumber: true })}
          />
          {errors.playTime && <div className="invalid-feedback">{errors.playTime.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="raters" className="form-label">Número de Raters</label>
          <input
            type="number"
            id="raters"
            className={`form-control ${errors.raters ? 'is-invalid' : ''}`}
            {...register('raters', { required: 'El número de raters es obligatorio', valueAsNumber: true })}
          />
          {errors.raters && <div className="invalid-feedback">{errors.raters.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="platforms" className="form-label">Plataformas</label>
          <input
            id="platforms"
            className={`form-control ${errors.platforms ? 'is-invalid' : ''}`}
            {...register('platforms', { required: 'Las plataformas son obligatorias' })}
          />
          {errors.platforms && <div className="invalid-feedback">{errors.platforms.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="developers" className="form-label">Desarrolladores</label>
          <input
            id="developers"
            className={`form-control ${errors.developers ? 'is-invalid' : ''}`}
            {...register('developers', { required: 'Los desarrolladores son obligatorios' })}
          />
          {errors.developers && <div className="invalid-feedback">{errors.developers.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="genres" className="form-label">Géneros</label>
          <input
            id="genres"
            className={`form-control ${errors.genres ? 'is-invalid' : ''}`}
            {...register('genres', { required: 'Los géneros son obligatorios' })}
          />
          {errors.genres && <div className="invalid-feedback">{errors.genres.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="publishers" className="form-label">Editores</label>
          <input
            id="publishers"
            className={`form-control ${errors.publishers ? 'is-invalid' : ''}`}
            {...register('publishers', { required: 'Los editores son obligatorios' })}
          />
          {errors.publishers && <div className="invalid-feedback">{errors.publishers.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="esrbRating" className="form-label">Clasificación ESRB</label>
          <select
            id="esrbRating"
            className={`form-select ${errors.esrbRating ? 'is-invalid' : ''}`}
            {...register('esrbRating', { required: 'La clasificación ESRB es obligatoria' })}
          >
            <option value="">Seleccione una clasificación</option>
            {ratings.map((rating, index) => (
              <option key={index} value={rating}>{rating}</option>
            ))}
          </select>
          {errors.esrbRating && <div className="invalid-feedback">{errors.esrbRating.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Crear Juego</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/lista-juegos')}>Cancelar</button>
      </form>
    </div>
  );
};

export default NuevoRegistro;
