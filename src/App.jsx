import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './auth/Login'; // Asegúrate de tener el componente Login
import Registro from './auth/Registro'; // Crearás este componente
import { AuthProvider } from './context/auth';
import Carga_img from './Screens/Carga_img'; // Crearás este componente
import Historial from './Screens/Historial'; // Crearás este componente
import Home from './Screens/Home'; // Crearás este componente
import Perfil from './Screens/Perfil'; // Crearás este componente
import Practica from './Screens/Practica'; // Crearás este componente
import Practica25 from './Screens/Practica25'; // Crearás este componente
import Practica50 from './Screens/Practica50'; // Crearás este componente
import Practica75 from './Screens/Practica75'; // Crearás este componente

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/carga_img" element={<Carga_img />} />
        <Route path="/perfil" element={<Perfil />} /> 
        <Route path="/practica" element={<Practica />} />
        <Route path="/practica25" element={<Practica25 />} />
        <Route path="/practica50" element={<Practica50 />} />
        <Route path="/practica75" element={<Practica75 />} /> 
        <Route path="/historial" element={<Historial />} /> 
      </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
