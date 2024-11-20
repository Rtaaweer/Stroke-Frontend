import React, { useEffect,useState } from 'react';
import Header from '../Components/Header'  
import Swal from "sweetalert2";
import Axios from "axios";

const Historial = () => {
    const [formData, setFormData] = useState({
        img: '',
        fecha: ''
      });

    const getUser = () => {
        const id_us = sessionStorage.getItem('id_us');
        if(id_us){
            Axios.get("http://localhost:3001/history",{
                params: {id_us:id_us}
            }).then((response) => {
                setFormData(response.data);
            }).catch((error) => {
                console.error("Error al obtener los datos del usuario:", error);
            });
        }
    }
    useEffect(() => {
        getUser();
    }, []);
console.log(formData);
  return (
    <div className="home-container">
      <Header /> 
      <main className="main-content d-flex align-items-center">
        <h1>Historial</h1>
        
      </main>
    </div>
  );
};

export default Historial;
