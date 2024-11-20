
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';  

const Header = () => {
  return (
    <header className="header d-flex justify-content-between align-items-center p-3 shadow">
      {/* Mostrar el Logo a la izquierda */}
      <div className="header-logo">
        <Link to="/home">
        <img src={process.env.PUBLIC_URL + "/logo-stroke.png"} alt="Logo" style={{ height: '60px' }} />
        </Link>
      </div>

      {/* Menú en el centro */}
      <nav className="header-menu">
        <ul className="d-flex list-unstyled mb-0">
          <li className="mx-3">
            <Link to="/home" className="text-decoration-none">Inicio</Link>
          </li>
          <li className="mx-3">
            <Link to="/carga_img" className="text-decoration-none">Test</Link>
          </li>
          <li className="mx-3">
            <Link to="/Práctica" className="text-decoration-none">Práctica</Link>
          </li>
          <li className="mx-3">
            <Link to="/historial" className="text-decoration-none">Historial</Link>
          </li>
        </ul>
      </nav>

      {/* Icono de perfil a la derecha */}
      <div className="header-profile">
        <Link to="/perfil">
          <FaUserCircle size={40} color="#333" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
