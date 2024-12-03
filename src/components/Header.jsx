
import { FaUserCircle } from 'react-icons/fa';
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Stroke.png';
import { useAuth } from '../context/auth';

const Header = () => {
  
  const { logout } = useAuth();
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
       await logout()
       sessionStorage.clear();
       navigate('/')
    } catch (error) {
        console.log(error);
    }
}
  return (
    <header className="flex justify-between items-center bg-gray-100 w-full drop-shadow-sm px-8">
      <div className="header-logo">
        <Link to="/">
        <img src={Logo} alt="Logo" style={{ height: '120px' }} />
        </Link>
      </div>

      {/* Menú en el centro */}
      <nav className="header-menu  ">
        <ul className="d-flex list-unstyled mb-0">
          <li className="mx-3">
            <Link to="/home" className="text-decoration-none text-black">Inicio</Link>
          </li>
          <li className="mx-3">
            <Link to="/carga_img  " className="text-decoration-none text-black">Test</Link>
          </li>
          <li className="mx-3">
            <Link to="/practica" className="text-decoration-none text-black">Práctica</Link>
          </li>
          <li className="mx-3">
            <Link to="/historial" className="text-decoration-none text-black">Historial</Link>
          </li>
        </ul>
      </nav>
      <div className='flex gap-5'>
        <div className="header-profile">
          <Link to="/perfil">
            <FaUserCircle size={40} color="#333" />
          </Link>
        </div>
        <div className="header-profile">
          <button onClick={handleLogout} >
            <RiLogoutBoxLine size={40} color="#333" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
