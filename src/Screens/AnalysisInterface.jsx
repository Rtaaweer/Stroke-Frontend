import { default as Axios, default as axios } from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import HandwritingAnalysis from "./HandwritingAnalysis";

const AnalysisInterface = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [urlImg, setUrlImg] = useState("");
  const [img, setImg] = useState(null);
  const [id_us, setUserId] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

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

    const handleDragOver = (event) => {
      event.preventDefault();
    };

    const handleDrop = (event) => {
      event.preventDefault();
      setSelectedFile(event.dataTransfer.files[0]);
    };

    //   const handleAnalyze = () => {
    //     // Implement your analysis logic here
    //     console.log('Analyzing file:', selectedFile);
    //   };
    const handleAnalyze = async (e) => {
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
      <div className=" bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-48 items-center">
          {/* Left Column - Upload Section */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Handwriting Analysis Tool
            </h1>
            <p className="text-gray-500 mb-8">
              Upload a photo of handwritten text for analysis
            </p>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-gray-700 mb-4">
                  Upload Handwriting Image
                </h2>

                {/* Upload Area */}

                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {urlImg && (
                    <div>
                      <img
                        src={urlImg}
                        style={{
                          width: "350px",
                          height: "350px",
                          padding: "20px",
                        }}
                        alt="Uploaded Preview"
                      />
                    </div>
                  )}
                  {!urlImg && (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      {/* Upload Icon */}
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>

                      {/* Upload Text */}
                      <div className="text-center">
                        <label className="text-indigo-600 hover:text-indigo-500 font-medium cursor-pointer">
                          Upload a file
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleImageChange}
                            accept="image/*"
                          />
                        </label>
                        <span className="text-gray-500"> or drag and drop</span>
                      </div>

                      <p className="text-sm text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* File Input */}
              <div className="flex items-center space-x-2">
                <label className="block">
                  <input
                    type="file"
                    id="file-input"
                    className="block w-full text-sm text-gray-500
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-md file:border-0
                             file:text-sm file:font-medium
                             file:bg-gray-100 file:text-gray-700
                             hover:file:bg-gray-200
                             cursor-pointer"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              </div>

              {/* Selected File Display */}
              {img && (
                <p className="text-sm text-gray-600">
                  Selected file: {img.name}
                </p>
              )}

              {/* Analysis Button */}
              <button
                className="w-full sm:w-auto px-6 py-3 rounded-md text-white font-medium
                         bg-gradient-to-r from-blue-500 to-indigo-600
                         hover:from-blue-600 hover:to-indigo-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                         transition-colors duration-200"
                onClick={handleAnalyze}
                disabled={!selectedFile}
                id="analizar"
                type="button"
              >
                Analyze Image
              </button>
            </div>
          </div>

          {/* Right Column - Decorative Image */}
          <div className="hidden md:block">
            <img
              src="https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Person writing"
              className="w-full h-full object-cover rounded-xl"
              style={{ minHeight: "500px" }}
            />
          </div>
        </div>
      </div>
        {urlImg && <HandwritingAnalysis imageUrl={urlImg} />}
        </>
    );
  };


export default AnalysisInterface;
