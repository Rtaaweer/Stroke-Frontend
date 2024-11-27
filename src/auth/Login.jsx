import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../assets/Stroke.png';
import { useAuth } from '../context/auth'; // Importar el contexto
const Login = () => {
  const [formData, setFormData] = useState({
    correo: '',
    password: '',
  });
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Manejo de "Olvidaste tu contraseña"
  const { login, resetPassword, logInWithGoogle } = useAuth(); // Funciones del contexto
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(formData.correo, formData.password);
      navigate('/home');
    } catch (error) {
      Swal.fire({
        title: 'Error en el inicio de sesión',
        text: error.message,
        icon: 'error',
        timer: 5000,
      });
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(formData.correo);
      Swal.fire({
        title: 'Correo de restablecimiento enviado',
        text: 'Revisa tu correo para restablecer la contraseña.',
        icon: 'success',
        timer: 5000,
      });
      setIsForgotPassword(false); // Regresar al formulario de login
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        timer: 5000,
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await logInWithGoogle();
      navigate('/home');
    } catch (error) {
      Swal.fire({
        title: 'Error al iniciar sesión con Google',
        text: error.message,
        icon: 'error',
        timer: 5000,
      });
    }
  };

  return (
    <section className="gradient-form d-flex justify-content-center align-items-center vh-100  w-screen">
      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-10 col-md-8 col-sm-12">
            <div className="card rounded-3 text-black animate__animated animate__fadeIn">
              <div className="row g-0">
                <div className="col-lg-6 animate__animated animate__fadeInLeft">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center flex flex-col gap-[-70px] items-center justify-center">
                      <img
                        src={Logo}
                        style={{ width: '120px' }}
                        alt="logo"
                        className="mb-4"
                      />
                      <h4 className="mt-1 mb-5 pb-1">Inicia sesión en Stroke</h4>
                    </div>

                    {/* Formulario dinámico */}
                    {!isForgotPassword ? (
                      <form onSubmit={handleLogin}>
                        <div className="form-outline mb-4">
                          <label className="form-label">Correo Electrónico</label>
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
                          <label className="form-label">Contraseña</label>
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

                        <div className="text-center pt-1 mb-5 pb-1 flex flex-col">
                          <button className=" bg-black rounded-sm text-white  w-auto h-[36px] text center" type="submit">
                            Iniciar Sesión
                          </button>
                          <button
                            className="btn btn-outline-primary btn-lg btn-block mt-3"
                            type="button"
                            onClick={handleGoogleLogin}
                          >
                            Iniciar con Google
                          </button>
                        </div>

                        <div className="d-flex justify-content-center pb-4">
                          <p className="mb-0 me-2">¿Olvidaste tu contraseña?</p>
                          <a
                            href="#"
                            onClick={() => setIsForgotPassword(true)}
                            className="btn btn-link"
                          >
                            Restablecer contraseña
                          </a>
                        </div>
                        
                      <Link to="/registro">
                          <button type="button" className="btn btn-outline-danger">
                            Registrarse
                          </button>
                        </Link>
                      </form>
                    ) : (
                      <form onSubmit={handleForgotPassword}>
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
                          <label className="form-label">Correo Electrónico</label>
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="btn btn-primary btn-lg btn-block" type="submit">
                            Enviar enlace de restablecimiento
                          </button>
                        </div>

                        <div className="d-flex justify-content-center pb-4">
                          <p className="mb-0 me-2">¿Ya tienes una cuenta?</p>
                          <a
                            href="#"
                            onClick={() => setIsForgotPassword(false)}
                            className="btn btn-link"
                          >
                            Volver a iniciar sesión
                          </a>
                        </div>
                      </form>
                    )}
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

export default Login;
