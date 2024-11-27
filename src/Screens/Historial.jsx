import React, { useEffect, useState } from 'react';
import Header from '../components/Header';   
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Historial = () => {
  const [data, setData] = useState([]); // Cambiamos formData a un array

  const getUser = () => {
    const id_us = sessionStorage.getItem('id_us');
    if (id_us) {
      Axios.get("http://localhost:3001/history", {
        params: { id_us: id_us }
      })
      .then((response) => {
        setData(response.data); // Guardar múltiples registros
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="home-container w-[1520px]">
      <Header />
      <main className="main-content d-flex flex-column align-items-center">
        <br />
        <br />
        <h1 className="mb-4">Tus análisis anteriores</h1>

        {/* Contenedor para la tarjeta y la imagen */}
        <div className="d-flex flex-row justify-content-between w-100">

          {/* Renderizar tarjetas dinámicamente */}
          <div className="d-flex flex-column">
            {data.map((item, index) => (
              <div key={index} className="card" 
              style={{ 
                width: '40rem', 
                height: '13rem',
                marginBottom: '20px', 
                marginLeft: '80px' ,
                backgroundColor: '#3f5866',
                color: '#fff',
                fontSize: '18px',
                borderRadius: '30px'
                }}>
                <div className="card-body">
                  <div className="row">
                    {/* Columna izquierda con porcentaje */}
                    <div className="col-5 d-flex justify-content-center align-items-center">
                      <div
                        style={{
                          width: '280px',
                          height: '140px',
                          backgroundColor: '#15297c',
                          color: '#fff',
                          borderRadius: '30px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '30px',
                          fontWeight: 'bold',
                        }}
                      >
                        {item.porcentaje}
                      </div>
                    </div>

                    {/* Columna derecha con nombre y fecha */}
                    <div className="col-7 d-flex align-items-center">
                      <p className="mb-0">
                        <strong>{item.nombre}</strong><br />
                        Hecho el {formatDate(item.fecha)} {/* Fecha formateada */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Imagen fija en el lado derecho */}
          <div className="fixed-image ">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
              alt="Imagen de la plataforma" 
              style={{ maxWidth: '300px', maxHeight: 'auto', borderRadius: '10px',   marginRight: '35%', marginTop: '150px'}}
            />
          </div>
        </div>
      </main> 
    </div>
  );
};

export default Historial;
