import React, { useEffect, useState } from 'react';
import Header from '../components/Header'; 
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import { Link } from "react-router-dom";
import './login.css';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";


const Practica = () => {
  const [data, setData] = useState([]); // Cambiamos formData a un array

  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();  

  useEffect(() => {
    if (!user && location.pathname !== "/") {
      navigate("/");
    }
  }, [user, location, navigate]);

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
      <main style={{alignContent: 'center'}}>
        <br />
        <br />
        <h1  class="title-prac" style={{marginTop: '60px', textAlign: 'center', paddingRight: '-10px'}}>Usa los recursos asignados para mejorar tu escritura</h1> 
         <div style={{maxWidth: '100%'}}> 
         <div class="container-fluid page-header py-0 mb-0">
         
          <div class="container">
            <div class="row g-4">
          <div class="col-lg-4 col-md-6 text-center mx-auto" style={{maxWidth: '500px'}} >
            <div class="product-container1">
              <h1 class="categ display-6 text-center" style={{color: 'white' }}>Ejercicios para 25%</h1>
              <div class="col-12 text-center">
                  <button class="btn btn-primary"><a href="/practica25" class="nav-item nav-link" style={{color: 'rgb(255, 255, 255)' }}>Ver ejercicios</a></button>
              </div>
            </div>
          </div>
        <div class="col-lg-4 col-md-6 text-center mx-auto" style={{maxWidth: '500px'}} >
          <div class="product-container2">
            <h1 class="categ display-6 text-center" style={{color: 'white' }}>Ejercicios para 50%</h1>
            <div class="col-12 text-center">
                <button class="btn btn-primary"><a href="/practica50" class="nav-item nav-link" style={{color: 'rgb(255, 255, 255)' }}>Ver ejercicios</a></button>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 text-center mx-auto" style={{maxWidth: '500px'}} >
          <div class="product-container3">
            <h1 class="categ display-6 text-center" style={{color: 'white' }}>Ejercicios para 75%</h1>
            <div class="col-12 text-center">
                <button class="btn btn-primary"><a href="/practica75" class="nav-item nav-link" style={{color: 'rgb(255, 255, 255)' }}>Ver ejercicios</a></button>
            </div>
          </div>
        </div>
        </div>
        </div>
        </div> 
        <br /> 
        <br />
        </div>
      </main> 
    </div>
  );
};

export default Practica;
