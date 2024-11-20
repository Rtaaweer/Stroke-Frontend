
import { Link } from 'react-router-dom';
import Header from '../Components/Header'  

const Home = () => {
  return (
    <div className="home-container">
      <Header /> 

      <main className="main-content d-flex justify-content-between align-items-center px-5">
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
    </div>
  );
};

export default Home;
