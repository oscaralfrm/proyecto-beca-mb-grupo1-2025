import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavbarGames from './components/NavbarGames/navbar-games';
import Menu from './components/Menu/menu';

const App = () => {
  return (
    <Router>
      <NavbarGames />
      <div className="container mt-3">
        <Menu />
      </div>
    </Router>
  );
};

export default App;