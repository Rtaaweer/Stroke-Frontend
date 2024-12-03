import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useAuth } from '../context/auth'; // Usa el contexto de autenticación
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate, useLocation } from "react-router-dom";

const Historial = () => {
  const [data, setData] = useState([]); // Para almacenar los análisis
  const { userId } = useAuth(); // Obtén el ID del usuario desde el contexto
  const db = getFirestore(); // Inicializa Firestore

  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();  

  useEffect(() => {
    if (!user && location.pathname !== "/") {
      navigate("/");
    }
  }, [user, location, navigate]);

  // Función para obtener los análisis del usuario autenticado
  const getUserHistory = async () => {
    if (userId) { // Asegúrate de que el usuario esté autenticado
      try {
        // Crea una consulta a la colección "analyses"
        const q = query(collection(db, 'analyses'), where('userId', '==', userId));
        console.log(userId);
        
        const querySnapshot = await getDocs(q);

        // Mapea los documentos para convertirlos en un array de objetos
        const userHistory = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(userHistory); // Guarda los datos en el estado
      } catch (error) {
        console.error('Error al obtener los datos del historial:', error);
      }
    }
  };

  // Usa useEffect para cargar los datos al montar el componente
  useEffect(() => {
    getUserHistory();
  }, [userId]); // Se ejecutará nuevamente si cambia el ID del usuario

  const formatDate = (timestamp) => {
    const date = timestamp.toDate(); // Convierte el Timestamp de Firestore a un objeto Date
    return new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'long',
      timeStyle: 'short', // Incluye hora
    }).format(date);
  };
  
  return (
    <div className="home-container w-[1520px]">
      <Header />
      <main className="main-content d-flex flex-column align-items-center">
        <br />
        <br />
        <h1 className="mb-4">Tus análisis anteriores</h1>

        {/* Contenedor para la tarjeta y la imagen */}
        <div className="d-flex flex-row justify-content-between w-100">
          {/* Renderizar tarjetas dinámicamente */}
          <div className="d-flex flex-column">
            {data.map((item, index) => (
              <div
                key={index}
                className="card"
                style={{
                  width: '40rem',
                  height: '13rem',
                  marginBottom: '20px',
                  marginLeft: '80px',
                  backgroundColor: '#3f5866',
                  color: '#fff',
                  fontSize: '18px',
                  borderRadius: '30px',
                }}
              >
                <div className="card-body">
                  <div className="row">
                    {/* Columna izquierda con porcentaje */}
                    <div className="col-5 d-flex justify-content-center align-items-center">
                      <div
                        style={{
                          width: '280px',
                          height: '140px',
                          backgroundColor: '#15297c',
                          color: '#fff',
                          borderRadius: '30px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: '30px',
                          fontWeight: 'bold',
                        }}
                      >
                        {item.legibilityScore.toFixed(2)}% 
                      </div>
                    </div>

                    {/* Columna derecha con texto y fecha */}
                    <div className="col-7 d-flex align-items-center">
                      <p className="mb-0">
                        <strong>Ver texto analizado.</strong>
                        <br />
                        Hecho el {formatDate(item.createdAt)} {/* Formatear fecha */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Imagen fija en el lado derecho */}
          <div className="fixed-image ">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
              alt="Imagen de la plataforma"
              style={{
                maxWidth: '300px',
                maxHeight: 'auto',
                borderRadius: '10px',
                marginRight: '35%',
                marginTop: '150px',
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Historial;
