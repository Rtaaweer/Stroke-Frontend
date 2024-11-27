import React, { useEffect, useState } from 'react';
import Header from '../components/Header';   
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Practica25 = () => {
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
        <h1  class="title-prac" style={{marginTop: '60px', textAlign: 'center', paddingRight: '-10px'}}>Usa los recursos asignados para puntaje de 25%</h1> 
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
  href="https://drive.google.com/uc?export=download&id=137blxSFlVcDcaJCHg8SDrkJM1G9hbjaq"
  download
>
                         <i class="fa-solid fa-file-arrow-down"   style={{fontSize: '100px' , color: '#f0f0df' }}></i>
                      </a>
                      </div>
                    </div> 
                    {/* Columna derecha con nombre y fecha */}
                    <div className="col-7 d-flex align-items-center">
                      <p className="mb-0">
                        <strong style={{fontSize: '30px', fontWeight: 'bold', color: '#2b3a42' }}>Abecedario</strong>
                        <br />
                        <strong style={{fontSize: '25px' , color: '#ff8f00' }}>A - I</strong>
                        <br />
                        Descripción: Este abecedario está diseñado para fomentar la escritura clara, 
                        fluida y estilizada, ayudando a desarrollar habilidades motrices finas 
                        esenciales para una caligrafía legible y estética. {/* Fecha formateada */}
                      </p>
                    </div>
                  </div>
                </div>
              </div> 
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
                          href="https://drive.google.com/uc?export=download&id=1qpux3xPhi5lEOmp9mwYviZLNcsfmuHhp"
                          download
                        >
                         <i class="fa-solid fa-file-arrow-down"   style={{fontSize: '100px' , color: '#f0f0df' }}></i>
                      </a>
                      </div>
                    </div> 
                    {/* Columna derecha con nombre y fecha */}
                    <div className="col-7 d-flex align-items-center">
                    <p className="mb-0">
                        <strong style={{fontSize: '30px', fontWeight: 'bold', color: '#2b3a42' }}>Abecedario</strong>
                        <br />
                        <strong style={{fontSize: '25px' , color: '#ff8f00' }}>J - Q</strong>
                        <br />
                        Descripción: Este abecedario está diseñado para fomentar la escritura clara, 
                        fluida y estilizada, ayudando a desarrollar habilidades motrices finas 
                        esenciales para una caligrafía legible y estética. {/* Fecha formateada */}
                      </p>
                    </div>
                  </div>
                </div>
              </div> 
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
                        href="https://drive.google.com/uc?export=download&id=1CawWRHqH6BfpvRjUJrwfJvJcEFj4G_RC"
                        download
                      >
                         <i class="fa-solid fa-file-arrow-down"   style={{fontSize: '100px' , color: '#f0f0df' }}></i>
                      </a>
                      </div>
                    </div> 
                    {/* Columna derecha con nombre y fecha */}
                    <div className="col-7 d-flex align-items-center">
                    <p className="mb-0">
                        <strong style={{fontSize: '30px', fontWeight: 'bold', color: '#2b3a42' }}>Abecedario</strong>
                        <br />
                        <strong style={{fontSize: '25px' , color: '#ff8f00' }}>R - Z</strong>
                        <br />
                        Descripción: Este abecedario está diseñado para fomentar la escritura clara, 
                        fluida y estilizada, ayudando a desarrollar habilidades motrices finas 
                        esenciales para una caligrafía legible y estética. {/* Fecha formateada */}
                      </p>
                    </div>
                  </div>
                </div>
              </div> 
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
                        href="https://drive.google.com/uc?export=download&id=1-tBbiK0_KzptCtTr0kKtbSq-PLjLWUau"
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
                        <strong style={{fontSize: '25px' , color: '#ff8f00' }}>0 - 9</strong>
                        <br />
                        Descripción: Un espacio diseñado para practicar números y mejorar la caligrafía se enfoca 
                        en enseñar a trazar números correctamente y con fluidez. Estos entornos pueden estar 
                        dirigidos para todo el publico y suelen incluir herramientas o materiales que 
                        facilitan el aprendizaje del trazo y el control motriz. {/* Fecha formateada */}
                      </p>
                    </div>
                  </div>
                </div>
              </div> 
              <div   className="card" 
              style={{ 
                width: '60rem', 
                height: '18rem',
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
                      <a href="https://drive.google.com/uc?export=download&id=1qdRChWv0iVxqxTMPAzp91iitbSTjCfeS" download>
                         <i class="fa-solid fa-file-arrow-down"   style={{fontSize: '100px' , color: '#f0f0df' }}></i>
                      </a>
                      </div>
                    </div> 
                    {/* Columna derecha con nombre y fecha */}
                    <div className="col-7 d-flex align-items-center">
                      <p className="mb-0">
                        <strong style={{fontSize: '30px', fontWeight: 'bold', color: '#2b3a42' }}>Ejercicios</strong>
                        <br />
                        <strong style={{fontSize: '25px' , color: '#ff8f00' }}>Trazos 1</strong>
                        <br />
                        Descripción: Un espacio para practicar trazos y mejorar la caligrafía es un entorno diseñado 
                        para desarrollar habilidades motoras finas esenciales para una escritura fluida y legible. 
                        Está enfocado en fortalecer el control del lápiz, la coordinación ojo-mano y la precisión de 
                        los movimientos, ayudando a los usuarios a dominar los elementos básicos de la escritura. {/* Fecha formateada */}
                      </p>
                    </div>
                  </div>
                </div>
              </div> 
              <div   className="card" 
              style={{ 
                width: '60rem', 
                height: '18rem',
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
                      <a href="https://drive.google.com/uc?export=download&id=1Fhn2iE3gKhYc-tx1LbwVO_fjZl5M-sOn" download>
                         <i class="fa-solid fa-file-arrow-down"   style={{fontSize: '100px' , color: '#f0f0df' }}></i>
                      </a>
                      </div>
                    </div> 
                    {/* Columna derecha con nombre y fecha */}
                    <div className="col-7 d-flex align-items-center">
                      <p className="mb-0">
                        <strong style={{fontSize: '30px', fontWeight: 'bold', color: '#2b3a42' }}>Ejercicios</strong>
                        <br />
                        <strong style={{fontSize: '25px' , color: '#ff8f00' }}>Trazos 2</strong>
                        <br />
                        Descripción: Un espacio para practicar trazos y mejorar la caligrafía es un entorno diseñado 
                        para desarrollar habilidades motoras finas esenciales para una escritura fluida y legible. 
                        Está enfocado en fortalecer el control del lápiz, la coordinación ojo-mano y la precisión de 
                        los movimientos, ayudando a los usuarios a dominar los elementos básicos de la escritura. {/* Fecha formateada */}
                      </p>
                    </div>
                  </div>
                </div>
              </div> 
              <div   className="card" 
              style={{ 
                width: '60rem', 
                height: '18rem',
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
                      <a href="https://drive.google.com/uc?export=download&id=12t52qR47ja6o9A9yeNKRMLAQeeMLiOi5" download>
                         <i class="fa-solid fa-file-arrow-down"   style={{fontSize: '100px' , color: '#f0f0df' }}></i>
                      </a>
                      </div>
                    </div> 
                    {/* Columna derecha con nombre y fecha */}
                    <div className="col-7 d-flex align-items-center">
                      <p className="mb-0">
                        <strong style={{fontSize: '30px', fontWeight: 'bold', color: '#2b3a42' }}>Ejercicios</strong>
                        <br />
                        <strong style={{fontSize: '25px' , color: '#ff8f00' }}>Trazos 3</strong>
                        <br />
                        Descripción: Un espacio para practicar trazos y mejorar la caligrafía es un entorno diseñado 
                        para desarrollar habilidades motoras finas esenciales para una escritura fluida y legible. 
                        Está enfocado en fortalecer el control del lápiz, la coordinación ojo-mano y la precisión de 
                        los movimientos, ayudando a los usuarios a dominar los elementos básicos de la escritura. {/* Fecha formateada */}
                      </p>
                    </div>
                  </div>
                </div>
              </div> 
              <div   className="card" 
              style={{ 
                width: '60rem', 
                height: '18rem',
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
                      <a href="https://drive.google.com/uc?export=download&id=1DB8t2Hv_Rjj5eBEpc9UgFwqMB7cSDCi9" download>
                         <i class="fa-solid fa-file-arrow-down"   style={{fontSize: '100px' , color: '#f0f0df' }}></i>
                      </a>
                      </div>
                    </div> 
                    {/* Columna derecha con nombre y fecha */}
                    <div className="col-7 d-flex align-items-center">
                      <p className="mb-0">
                        <strong style={{fontSize: '30px', fontWeight: 'bold', color: '#2b3a42' }}>Ejercicios</strong>
                        <br />
                        <strong style={{fontSize: '25px' , color: '#ff8f00' }}>Trazos 4</strong>
                        <br />
                        Descripción: Un espacio para practicar trazos y mejorar la caligrafía es un entorno diseñado 
                        para desarrollar habilidades motoras finas esenciales para una escritura fluida y legible. 
                        Está enfocado en fortalecer el control del lápiz, la coordinación ojo-mano y la precisión de 
                        los movimientos, ayudando a los usuarios a dominar los elementos básicos de la escritura. {/* Fecha formateada */}
                      </p>
                    </div>
                  </div>
                </div>
              </div> 
              <div   className="card" 
              style={{ 
                width: '60rem', 
                height: '18rem',
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
                      <a href="https://drive.google.com/uc?export=download&id=1TAvwEEWp9WiS92kQfljBAKglEXkZGT_N" download>
                         <i class="fa-solid fa-file-arrow-down"   style={{fontSize: '100px' , color: '#f0f0df' }}></i>
                      </a>
                      </div>
                    </div> 
                    {/* Columna derecha con nombre y fecha */}
                    <div className="col-7 d-flex align-items-center">
                      <p className="mb-0">
                        <strong style={{fontSize: '30px', fontWeight: 'bold', color: '#2b3a42' }}>Ejercicios</strong>
                        <br />
                        <strong style={{fontSize: '25px' , color: '#ff8f00' }}>Trazos 5</strong>
                        <br />
                        Descripción: Un espacio para practicar trazos y mejorar la caligrafía es un entorno diseñado 
                        para desarrollar habilidades motoras finas esenciales para una escritura fluida y legible. 
                        Está enfocado en fortalecer el control del lápiz, la coordinación ojo-mano y la precisión de 
                        los movimientos, ayudando a los usuarios a dominar los elementos básicos de la escritura. {/* Fecha formateada */}
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

export default Practica25;
