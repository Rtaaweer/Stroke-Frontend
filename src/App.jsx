import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./auth/Login"; // Asegúrate de tener el componente Login
import Registro from "./auth/Registro"; // Crearás este componente
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/auth";
import Carga_img from "./Screens/Carga_img"; // Crearás este componente
import Historial from "./Screens/Historial"; // Crearás este componente
import Home from "./Screens/Home"; // Crearás este componente
import Perfil from "./Screens/Perfil"; // Crearás este componente
import Practica from "./Screens/Practica"; // Crearás este componente
import Practica25 from "./Screens/Practica25"; // Crearás este componente
import Practica50 from "./Screens/Practica50"; // Crearás este componente
import Practica75 from "./Screens/Practica75"; // Crearás este componente

const App = () => {


  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/carga_img"
            element={
              <ProtectedRoute>
                <Carga_img />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practica"
            element={
              <ProtectedRoute>
                <Practica />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practica25"
            element={
              <ProtectedRoute>
                <Practica25 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practica50"
            element={
              <ProtectedRoute>
                <Practica50 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/practica75"
            element={
              <ProtectedRoute>
                <Practica75 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/historial"
            element={
              <ProtectedRoute>
                <Historial />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
