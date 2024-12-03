import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Importa tu instancia de auth de Firebase
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

const Perfil = () => {

  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();  

  useEffect(() => {
    if (!user && location.pathname !== "/") {
      navigate("/");
    }
  }, [user, location, navigate]);

 
  const [formData, setFormData] = useState({
    nombre: '',
    app: '',
    apm: '',
    edad: '',
    telefono: '',
    correo: '',
    password: ''
  });

  // Función para obtener los datos del usuario
  const getUser = () => {
    const id_us = sessionStorage.getItem('id_us');
    if (id_us) {
      Axios.get("http://localhost:3001/user", {
        params: { id_us: id_us }
      })
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Función para actualizar los datos del usuario
  const update = () => {
    const id_us = sessionStorage.getItem('id_us');
    Axios.put("http://localhost:3001/update", {
      id_us: id_us,
      ...formData
    }).then(() => {
      getUser();
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Excelente!</strong>",
        html: <i>El usuario <strong>${formData.nombre} ${formData.app} ${formData.apm}</strong> fue editado con éxito</i>,
        icon: "success",
        timer: 8000
      });
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const limpiarCampos = () => {
    setFormData({
      nombre: '',
      app: '',
      apm: '',
      edad: 0,
      telefono: '',
      correo: '',
      password: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update();
  };

  // Función para cerrar sesión con Firebase
  const logout = async () => {
    try {
      await signOut(auth); // Método de Firebase para cerrar sesión  

      Swal.fire({
        title: "<strong>¡Bye!</strong>",
        html: <i>Sesión cerrada con éxito.</i>,
        icon: "success",
        timer: 8000
      }).then(() => {
        navigate('/'); // Redirigir a la página principal
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al cerrar sesión.",
        icon: "error",
        timer: 5000
      });
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="home-container w-[1520px]">
      <Header />
      <main className="main-content d-flex align-items-center">
        <div className="card-body" style={{ width: '70%' }}>
          <form onSubmit={handleSubmit} className="p-4 m-4">
            <h1 className="home-title">Perfil</h1>
            <div className="form-outline mb-4">
              <input
                type="text"
                name="nombre"
                className="form-control form-control-lg"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="text"
                name="app"
                className="form-control form-control-lg"
                placeholder="Apellido Paterno"
                value={formData.app}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="text"
                name="apm"
                className="form-control form-control-lg"
                placeholder="Apellido Materno"
                value={formData.apm}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="number"
                name="edad"
                className="form-control form-control-lg"
                placeholder="Edad"
                value={formData.edad}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="text"
                name="telefono"
                className="form-control form-control-lg"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="email"
                name="correo"
                className="form-control form-control-lg"
                placeholder="Correo Electrónico"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                name="password"
                className="form-control form-control-lg"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="text-center pt-1 mb-5 pb-1">
              <button className="btn btn-primary btn-lg btn-block" type="submit">
                Guardar
              </button>
            </div>
          </form>
        </div>

        <div className="product-container4">
          <h1 className="categ display-6 text-center" style={{ color: 'white', fontWeight: '500' }}>
            Adiós {formData.nombre}.
          </h1>
          <div className="col-12 text-center">
            <button className="btn btn-primary" onClick={logout}>
              <span className="nav-item nav-link" style={{ color: 'rgb(255, 255, 255)' }}>
                Cerrar sesión
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Perfil;