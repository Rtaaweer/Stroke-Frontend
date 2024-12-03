import { default as Axios, default as axios } from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Header from "../components/Header";
import HandwritingAnalysis from "./HandwritingAnalysis";
import AnalysisInterface from "./AnalysisInterface";
import {Helmet} from "react-helmet";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

const Carga_img = () => {
  const [img, setImg] = useState(null); // Para almacenar el archivo seleccionado
  const [urlImg, setUrlImg] = useState(""); // Para almacenar la URL de Cloudinary
  const [id_us, setUserId] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && location.pathname !== "/") {
      navigate("/");
    }
  }, [user, location, navigate]);

  useEffect(() => {
    const id = sessionStorage.getItem("id_us");
    if (id) {
      setUserId(id);
    }
  }, []);

  const limpiarCampos = () => {
    setImg(null);
    setUrlImg("");
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

    // Guardar URL en el backend
    await Axios.post("http://localhost:3001/carga", {
      img: urlImg,
      id_us: id_us,
    }).then(() => {
      limpiarCampos();
      Swal.fire({
        title: "<strong>¡Excelente!</strong>",
        html: `<i>Analizando imagen...</i>`,
        icon: "success",
        timer: 8000,
      });
    });
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
        timer: 4000,
      });
    }
  };

  return (
    <>
    <div className="home-container w-[1520px]">
      <Header />

      {/* <main className="main-content d-flex justify-content-between align-items-center px-5">
        <div className="text-content">
          <br />
          <br />
          <h1 className="text-3xl font-inter font-semibold">
            Handwriting Analysis Tool
          </h1>
          <h3 className="text-sm font-medium text-[#71717a]">
            Upload a photo of handwritten text for analysis
          </h3>
          <div>
            <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
              <div class="space-y-4">
                <label
                  for="handwriting"
                  class="block text-sm font-medium text-gray-700"
                >
                  Upload Handwriting Image
                </label>
                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div class="space-y-1 text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label
                        for="handwriting"
                        class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="handwriting"
                          name="handwriting"
                          type="file"
                          accept="image/*"
                          class="sr-only"
                        />
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                    style={{ width: "350px", height: "350px", padding: "20px" }}
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

        <div className="image-content" style={{ Height: "1200px" }}>
          <img
            src="https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Escribiendo"
            className="img-fluid"
            style={{
              maxWidth: "700px",
              Height: "1200px",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          />
        </div>
      </main> */}
      <Helmet>
          <title>Carga de Imagen</title>
      </Helmet>
      <AnalysisInterface></AnalysisInterface>
      {/* {urlImg && <HandwritingAnalysis imageUrl={urlImg} />} */}
    </div>

    
 </>
  );
};

export default Carga_img;
