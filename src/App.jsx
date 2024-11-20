import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Screens/Login';  // Asegúrate de tener el componente Login
import Registro from './Screens/Registro'; // Crearás este componente
import Home from './Screens/Home';  // Crearás este componente
import Carga_img from './Screens/Carga_img';  // Crearás este componente
import Perfil from './Screens/Perfil';  // Crearás este componente
import Historial from './Screens/Historial';  // Crearás este componente

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/carga_img" element={<Carga_img />} />
        <Route path="/perfil" element={<Perfil />} /> 
        <Route path="/historial" element={<Historial />} /> 
      </Routes>
    </Router>
  );
};

export default App;
