import React, { useEffect,useState } from 'react';
import Header from '../Components/Header'  
import Swal from "sweetalert2";
import Axios from "axios";

const Perfil = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        app: '',
        apm: '',
        edad: '',
        telefono: '',
        correo: '',
        password: ''
      });

    const getUser = () => {
        const id_us = sessionStorage.getItem('id_us');
        if(id_us){
            Axios.get("http://localhost:3001/user",{
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

    const update = () => {
        const id_us = sessionStorage.getItem('id_us');
        Axios.put("http://localhost:3001/update", {
          id_us: id_us, 
          nombre: formData.nombre,
          app: formData.app,
          apm: formData.apm,
          edad: formData.edad,
          telefono: formData.telefono,
          correo: formData.correo,
          password: formData.password
        }).then(() => {
            getUser();
          limpiarCampos();
          Swal.fire({
            title: "<strong>¡Excelente!</strong>",
            html: `<i>El usuario <strong>${formData.nombre} ${formData.app} ${formData.apm}</strong> fue editado con éxito</i>`,
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

  return (
    <div className="home-container">
      <Header /> 
      <main className="main-content d-flex align-items-center">
        <div className="card-body">
            <form onSubmit={handleSubmit} className=' p-4 m-4'>
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
                    Guardar
                </button>
                </div>
            </form>
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
      </main>
    </div>
  );
};

export default Perfil;
