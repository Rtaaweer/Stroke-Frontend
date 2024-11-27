import React, { useEffect, useState } from 'react';
import Header from '../components/Header';   
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Practica50 = () => {
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
        <h1  class="title-prac" style={{marginTop: '60px', textAlign: 'center', paddingRight: '-10px'}}>Usa los recursos asignados para puntaje de 50%</h1> 
        {/* Contenedor para la tarjeta y la imagen */}
        <div className="d-flex flex-row justify-content-between w-100"> 
          {/* Renderizar tarjetas dinámicamente */}
          <div className="d-flex flex-column">
              <div   className="card" 
              style={{ 
                width: '60rem', 
                height: '16rem',
                marginBottom: '20px', 
                marginLeft: '80px' , 
                fontSize: '18px',
                borderRadius: '30px'
                }}>
                <div className="card-body">
                  <div className="row">
                    {/* Columna izquierda con porcentaje */}
                    <div className="col-5 d-flex justify-content-center align-items-center">
                      <div
                        style={{
                          width: '300px',
                          height: '200px',
                          backgroundColor: '#bdd3de',
                          color: '#fff',
                          borderRadius: '30px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '30px',
                          fontWeight: 'bold',
                        }}
                      > 
                       <a
                          href="https://drive.google.com/uc?export=download&id=1QIYfkA7-tUWpv83y-vyDNAyiKnuQYKEO"
                          download
                        >
                         <i class="fa-solid fa-file-arrow-down"   style={{fontSize: '100px' , color: '#f0f0df' }}></i>
                      </a>
                      </div>
                    </div> 
                    {/* Columna derecha con nombre y fecha */}
                    <div className="col-7 d-flex align-items-center">
                    <p className="mb-0">
                        <strong style={{fontSize: '30px', fontWeight: 'bold', color: '#2b3a42' }}>Abecedario en cursiva</strong>
                        <br />
                        <strong style={{fontSize: '25px' , color: '#ff8f00' }}>A - Z</strong>
                        <br />
                        Descripción: Una herramienta diseñada para practicar el abecedario en cursiva, 
                        enfocada en mejorar la calidad y fluidez de la caligrafía. Este espacio ofrece 
                        ejercicios detallados para trazar cada letra con precisión, permitiendo 
                        desarrollar un estilo de escritura cursiva armónico y uniforme. {/* Fecha formateada */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>  
              <div   className="card" 
              style={{ 
                width: '60rem', 
                height: '22rem',
                marginBottom: '20px', 
                marginLeft: '80px' , 
                fontSize: '18px',
                borderRadius: '30px'
                }}>
                <div className="card-body">
                  <div className="row">
                    {/* Columna izquierda con porcentaje */}
                    <div className="col-5 d-flex justify-content-center align-items-center">
                      <div
                        style={{
                          width: '300px',
                          height: '200px',
                          backgroundColor: '#bdd3de',
                          color: '#fff',
                          borderRadius: '30px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '30px',
                          fontWeight: 'bold',
                        }}
                      > 
                      <a
                        href="https://drive.google.com/uc?export=download&id=12D1ULVOwV5vCIm43UDL23NiDQorXKrcC"
                        download
                      >
                         <i class="fa-solid fa-file-arrow-down"   style={{fontSize: '100px' , color: '#f0f0df' }}></i>
                      </a>
                      </div>
                    </div> 
                    {/* Columna derecha con nombre y fecha */}
                    <div className="col-7 d-flex align-items-center">
                      <p className="mb-0">
                        <strong style={{fontSize: '30px', fontWeight: 'bold', color: '#2b3a42' }}>Números</strong>
                        <br />
                        <strong style={{fontSize: '25px' , color: '#ff8f00' }}>0 - 10</strong>
                        <br />
                        Descripción: Un lugar dedicado a la práctica de números, ideal para perfeccionar la 
                        caligrafía y desarrollar trazos precisos y fluidos. Este espacio proporciona ejercicios 
                        guiados que enseñan a escribir cada número con claridad, promoviendo el control motriz 
                        y la consistencia en la escritura.
                        Dirigido a personas de todas las edades, combina materiales prácticos y técnicas 
                        pedagógicas para facilitar el aprendizaje, logrando que los trazos sean uniformes y 
                        estéticamente agradables. {/* Fecha formateada */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>  
          </div>
           
        </div>
      </main> 
    </div>
  );
};

export default Practica50;
