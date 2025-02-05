import { Link } from 'react-router-dom';

export const Navbar = () => {

  return (
    <nav className="bg-success navbar navbar-expand-lg sticky-top container-fluid">
      <div className="container-fluid">
        <Link to={'/'}>
          <div className="navbar-brand text-light">
            <i className="bi bi-controller"> Ranking de Juegos</i>
          </div>
        </Link>
        <div>
          <Link to={"/"} className="text-light">
            Inicio
          </Link>&nbsp;|&nbsp;
          <Link to={"/games"} className="text-light">
            Games
          </Link>
        </div>
      </div>
    </nav>
  );
};
