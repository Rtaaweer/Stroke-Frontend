import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import Axios from "axios";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    app: '',
    apm: '',
    edad: 0,
    telefono: '',
    correo: '',
    password: ''
  });

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

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: formData.nombre,
      app: formData.app,
      apm: formData.apm,
      edad: formData.edad,
      telefono: formData.telefono,
      correo: formData.correo,
      password: formData.password
    }).then(() => {
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Excelente!</strong>",
        html: `<i>El usuario <strong>${formData.nombre} ${formData.app} ${formData.apm}</strong> fue registrado con éxito</i>`,
        icon: "success",
        timer: 8000
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add();
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
                        src="/Stroke.png"
                        style={{ width: '120px' }}
                        alt="logo"
                        className="mb-4"
                      />
                      <h4 className="mt-1 mb-5 pb-1">Crea tu cuenta en Stroke</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
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
                          placeholder="Telefono"
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
                          placeholder="Correo Electronico"
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
                          Registrarse
                        </button>
                      </div>

                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">¿Ya tienes una cuenta?</p>
                        <Link to="/">
                          <button type="button" className="btn btn-outline-danger">
                            Iniciar Sesión
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
                      alt="Imagen de la plataforma"
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

export default Registro;
