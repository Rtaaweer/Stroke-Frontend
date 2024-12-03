
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && location.pathname !== "/") {
      navigate("/");
    }
  }, [user, location, navigate]);
  
  return (
    <div className="home-container w-[1520px]">
      <Header /> 

      <main className="main-content d-flex justify-content-between align-items-center">
        <div className="text-content">
          <h1 className="home-title">Mejora tu Escritura con Stroke</h1>
          <p className="home-paragraph">
            La escritura es una de las habilidades más importantes que puedes desarrollar.
            En Stroke, te ayudamos a mejorar tu capacidad de redacción y expresión escrita
            a través de herramientas avanzadas y ejercicios personalizados.
          </p>
          <Link to="/carga_img">
            <button className="btn btn-primary btn-lg">Cargar imagen</button>
          </Link>
        </div>

        {/* Imagen */}
        <div className="image-content">
          <img
            src="https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Escribiendo"
            className="img-fluid"
            style={{ maxWidth: '800px', borderRadius: '10px' }}
          />
        </div>
      </main>
      <div className="relative h-full w-full bg-slate-950"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">AAAAA</div></div>
    </div>
  );
};

export default Home;
