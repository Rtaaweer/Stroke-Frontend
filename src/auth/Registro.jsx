import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../context/auth';
import Logo from '../assets/Stroke.png';



const Registro = () => {
  const [formData, setFormData] = useState({ correo: '', password: '' });
  const { signup, logInWithGoogle, sendEmailVerification } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

  const isPasswordStrong = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);

  const handleGoogleLogin = async () => {
    try {
      const result = await logInWithGoogle();
      Swal.fire({
        title: '¡Registro exitoso!',
        text: `Bienvenido/a, ${result.user.displayName}`,
        icon: 'success',
        timer: 5000,
      });
      navigate('/home');
    } catch (error) {
      Swal.fire({
        title: 'Error en el registro',
        text: `Ocurrió un error: ${error.message}`,
        icon: 'error',
        timer: 5000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isEmailValid(formData.correo)) {
      Swal.fire({
        title: 'Correo inválido',
        text: 'Por favor, ingresa un correo electrónico válido.',
        icon: 'error',
        timer: 5000,
      });
      return;
    }
  
    if (!isPasswordStrong(formData.password)) {
      Swal.fire({
        title: 'Contraseña débil',
        text: 'La contraseña debe tener al menos 8 caracteres, incluir una letra, un número y un carácter especial.',
        icon: 'error',
        timer: 5000,
      });
      return;
    }
  
    try {
      const userId = await signup(formData.correo, formData.password);
      console.log('User created:', userId);

      // Envía el correo de verificación
      await sendEmailVerification();
      Swal.fire({
        title: '¡Registro exitoso!',
        text: 'Revisa tu correo para activar tu cuenta.',
        icon: 'success',
        timer: 5000,
      });

      navigate('/home');
    } catch (error) {
      console.error('ERROR:', error);
  
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire({
          title: 'Correo en uso',
          text: 'Este correo ya está registrado. Por favor, usa otro o inicia sesión.',
          icon: 'error',
          timer: 5000,
        });
      } else if (error.code === 'auth/weak-password') {
        Swal.fire({
          title: 'Contraseña débil',
          text: 'La contraseña no cumple con los requisitos de seguridad.',
          icon: 'error',
          timer: 5000,
        });
      } else {
        Swal.fire({
          title: 'Error en el registro',
          text: `Ocurrió un error inesperado: ${error.message}`,
          icon: 'error',
          timer: 5000,
        });
      }
    }
  };
  

  return (
    <section className="gradient-form d-flex justify-content-center align-items-center vh-100 w-screen">
      <div className="container py-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-10 col-md-8 col-sm-12">
            <div className="card rounded-3 shadow-lg text-black animate__animated animate__fadeIn">
              <div className="row g-0">
                <div className="col-lg-6 animate__animated animate__fadeInLeft">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center items-center ">
                      <img
                        src={Logo}
                        style={{ width: '120px' }}
                        alt="logo"
                        className="mb-4"
                      />
                      <h4 className="mt-1 mb-5 pb-1">Crea tu cuenta en Stroke</h4>
                    </div>

                    <form onSubmit={handleSubmit}>
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
                        <label className="form-label">Contraseña</label>
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

                    <div className="d-flex justify-content-center">
                      <button type="button" onClick={handleGoogleLogin} className="btn btn-danger btn-lg btn-block">
                        Registrarse con Google
                      </button>
                    </div>
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
