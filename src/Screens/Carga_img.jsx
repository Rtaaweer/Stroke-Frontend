import { useEffect, useState } from 'react';
import Header from '../Components/Header'  
import Swal from "sweetalert2";
import Axios from "axios";
import axios from 'axios';

const Carga_img = () => {
  const [img, setImg] = useState(null); // Para almacenar el archivo seleccionado
  const [urlImg, setUrlImg] = useState(''); // Para almacenar la URL de Cloudinary
  const [id_us, setUserId] = useState('');

  useEffect(() =>{
    const id = sessionStorage.getItem('id_us');
    if(id){
      setUserId(id);
    }
  }, []);

  const limpiarCampos = () => {
    setImg(null);
    setUrlImg('');
  };

  const addImg = async () => {
    if (!urlImg) {
        Swal.fire({
            title: "<strong>Error</strong>",
            html: `<i>No se ha subido ninguna imagen.</i>`,
            icon: "error",
            timer: 4000,
        });
        return;
    }

    // Guardar URL de imagen y analizar en funcion backend
    try {
        const response = await Axios.post("http://localhost:3001/carga", {
            img: urlImg,
            id_us: id_us,
        });

        limpiarCampos();
        Swal.fire({
            title: "<strong>¡Excelente!</strong>",
            html: `<i>Imagen registrada con análisis completado.</i>`,
            icon: "success",
            timer: 3000,
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: "<strong>Error</strong>",
            html: `<i>Ocurrió un problema durante el análisis.</i>`,
            icon: "error",
            timer: 2000,
        });
    }
};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);

      // Previsualizar la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrlImg(reader.result); // Almacena la URL local temporalmente
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (img) {
      try {
        const data = new FormData();
        data.append("file", img);
        data.append("upload_preset", "Preset_stroke");

        // Subir a Cloudinary
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/ddfc17kwj/image/upload",
          data
        );

        // Almacenar URL de Cloudinary en urlImg
        setUrlImg(response.data.secure_url);

        // Llamar a addImg para guardar la URL en el backend
        await addImg();

      } catch (error) {
        console.error("Error al subir la imagen:", error);
      }
    } else {
      Swal.fire({
        title: "<strong>Error</strong>",
        html: `<i>No se ha seleccionado ninguna imagen.</i>`,
        icon: "error",
        timer: 4000
      });
    }
  };

  return (
    <div className="home-container">
      <Header /> 

      <main className="main-content d-flex justify-content-between align-items-center px-5">
        <div className="text-content">
          <br />
          <br />
          <h1 className="home-title pt-2">Mejora tu Escritura con Stroke</h1>
          <h3 className="home-sub-title">Carga imagen para poder realizar análisis.</h3>
          <div>
            <form onSubmit={handleSubmit}>
              <input 
                type="file" 
                accept="image/*" // solo acepta imágenes
                onChange={handleImageChange} // Previsualiza sin subir
              />
              {urlImg && (
                <div>
                  <img 
                    src={urlImg} 
                    style={{ width: '350px', height: '350px', padding: '20px' }} 
                    alt="Uploaded Preview" 
                  />
                </div>
              )}
              <br />
              <br />
              <div className="text-left pt-1 mb-5 pb-1">
                <button
                  className="btn btn-primary btn-block gradient-custom-2 ml-5"
                  type="submit"
                >
                  Analizar imagen
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* Imagen */}
        <div className="image-content" style={{Height: '1200px'}}>
          <img
            src="https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Escribiendo"
            className="img-fluid"
            style={{ maxWidth: '700px',Height: '1200px', borderRadius: '10px' , marginTop: '10px'}}
          />
        </div>
      </main>
    </div>
  );
};

export default Carga_img;
