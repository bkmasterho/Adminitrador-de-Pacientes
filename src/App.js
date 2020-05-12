import React, {Fragment, useState, useEffect} from 'react';
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";


function App() {
  
  // Citas en local storage

  let citasIniciales  = JSON.parse(localStorage.getItem("citas"));
  if(!citasIniciales) {
    citasIniciales = [];
  }
  
  //Arreglo de citas
   const [citas, guardarCitas] = useState(citasIniciales);

   // Use Effec para realizar ciertas operaciones cuando el state cambia 
   useEffect( () => {
    let citasIniciales  = JSON.parse(localStorage.getItem("citas"));
    
    if(citasIniciales)  {
      localStorage.setItem("citas", JSON.stringify(citas))
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas] );

   //Funcion que tome las citas actuales y agrege la nueva
   const crearCita = cita => {
    guardarCitas([...citas, cita]); /*Hago una copia de mi cita para que no
    elimine la otra cita y luego paso la nueva cita
    */

    }
  
    //Funcion que elimina una cita por su ID Capitulo 59 curso react
    const eliminarCita = id => {
      
      const nuevasCitas = citas.filter(cita => cita.id !== id ); //Intera en las citas individualmente y deja las que tienen id diferente.
      guardarCitas(nuevasCitas);

    }
    
    // Mensaje condicional 
    const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";
    
  
    return (

      <Fragment>
          <h1> Administrador de pacientes veterinarios </h1>
  
          <div className="container"> 
            <div className="row">
                <div className="one-half column">

                  <Formulario
                  crearCita={crearCita}
                  />
                  
                  </div>
              <div className="one-half column"> 
                  <h2> {titulo} </h2>
                  {citas.map(cita => (
                      <Cita
                      key={cita.id}
                      cita={cita}
                      eliminarCita={eliminarCita}
                        />

                  ))}

              
             </div>
            </div>
          </div>
          
        </Fragment>
  
      );
}

export default App;
