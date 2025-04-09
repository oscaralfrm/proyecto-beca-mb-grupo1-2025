// Menu.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PantallaInicio from '../PantallaInicio/pantalla-inicio';
import NuevoRegistro from '../NuevoRegistro/nuevo-registro';
import Conversor from '../Conversor/conversor';
import Bandeja from '../bandeja.jsx';
import ConsultaRegistros from '../ConsultaRegistros/consulta-registros';
// import ActualizarRegistro from '../ActualizacionRegistro/ActualizacionRegistro';

const Menu = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PantallaInicio />} />
        <Route path="/nuevo-juego" element={<NuevoRegistro />} />
        <Route path="/conversor" element={<Conversor />} />
        <Route path="/lista-juegos" element={<ConsultaRegistros />} />
        <Route path="/" element={<PantallaInicio />} />
        <Route path="/bandeja" element={<Bandeja />} />
        {/* <Route path="/actualizar-registro/:id" element={<ActualizarRegistro />} /> */}
      </Routes>
    </div>
  );
};

export default Menu;
