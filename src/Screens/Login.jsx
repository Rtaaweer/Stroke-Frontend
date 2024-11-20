import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from 'axios';

const Login = () => {

  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });

  // Función para actualizar el estado cuando cambia un campo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const limpiarCampos = () => {
    setFormData({
      correo: '',
      password: ''
    });
  };

  const navigate = useNavigate();
    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post('http://localhost:3001/login', formData);
        sessionStorage.setItem('id_us', data.id_us);
        Swal.fire({
          title: "<strong>¡Excelente!</strong>",
          html: `<i>El usuario con el correo <strong>${formData.correo}</strong> fue encontrado con éxito</i>`,
          icon: "success",
          timer: 8000
        }).then(() => {
          navigate('/home'); // Redirigir a la ruta /home
        });
      } catch (error) {
        const errorMsg = error?.response?.data || 'Error de conexión con el servidor';
        Swal.fire({
          title: "<strong>¡Noo!</strong>",
          html: `<i>${errorMsg}</i>`,
          icon: "error",
          timer: 8000
        });
        limpiarCampos(); // Limpia los campos después del error
      }
    };

  return (
    <section className="gradient-form d-flex justify-content-center align-items-center vh-100">
      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-10 col-md-8 col-sm-12">
            <div className="card rounded-3 shadow-lg text-black animate__animated animate__fadeIn">
              <div className="row g-0">
                <div className="col-lg-6 animate__animated animate__fadeInLeft">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img
                        src="/logo-stroke.png"
                        style={{ width: '120px' }}
                        alt="logo"
                        className="mb-4"
                      />
                      <h4 className="mt-1 mb-5 pb-1">Bienvenido a Stroke</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <p className="text-muted">Ingresa los datos de tu cuenta</p>

                      <div className="form-outline mb-4">
                        <input
                            type="email"
                            name="correo"
                            className="form-control form-control-lg"
                            placeholder="Correo Electronico"
                            value={formData.correo}
                            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                            required
                          />
                        <label className="form-label" htmlFor="form2Example11">
                          Correo electronico
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                            type="password"
                            name="password"
                            className="form-control form-control-lg"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                          />
                        <label className="form-label" htmlFor="form2Example22">
                          Contraseña
                        </label>
                      </div>

                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-lg btn-block gradient-custom-2"
                          type="submit"
                        >
                          Entrar
                        </button>
                        <a className="text-muted d-block mt-3" href="#!">
                          ¿Olvidaste tu contraseña?
                        </a>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">¿No tienes una cuenta?</p>
                        <Link to="/registro">
                        <button type="button" className="btn btn-outline-danger">
                          Regístrate
                        </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="col-lg-6 d-none d-lg-flex align-items-center gradient-custom-2 animate__animated animate__fadeInRight">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4 d-flex justify-content-center">
                    <img
                      src="https://images.pexels.com/photos/4240497/pexels-photo-4240497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Imagen de inicio"
                      className="img-fluid"
                      style={{ maxWidth: '100%', borderRadius: '10px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
