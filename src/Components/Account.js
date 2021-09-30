import React, {  useState,useContext, useEffect } from "react";
import { MyContext } from "../Context/MyContext";
import Loader from "react-loader-spinner";

export default function Account() {

    const {user, setUser} = useContext(MyContext); 
    const [empresas, setEmpresas] = useState([]);
    const [empresaSelect, setEmpresaSelect] = useState([]);
    const [empresaActual, setEmpresaActual] = useState([]);
    const [proyectoActual, setProyectoActual] = useState([]);
    const [historiaActual, setHistoriaActual] = useState([]);
    const [estado, setEstado] = useState([]);
    const [loading1, setLoading1] = useState(true);
    
   

    let historiaNombreRef = React.createRef();
    let historiaDescripcionRef = React.createRef();
    let ticketEstadoRef = React.createRef();
    let ticketComentarioRef = React.createRef(); 
    let ticketEstadoRef1 = React.createRef();
    let ticketComentarioRef1 = React.createRef(); 


    async function fetchData() {
        
        const result = await fetch("http://localhost:3500/api/empresas", {
        method: "get",
        mode: "cors",
        headers: {
          Accept: "application/json",
          Authorization: "Basic " + btoa("devops2021*:devops2021*"),
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();      
      setEmpresas(data);            
      setLoading1(false)
      
    }
    

    useEffect(() => {        
        fetchData();
      }, [proyectoActual]);



      useEffect(() => {
        for (var i = 0 ; i < empresas.length ; i ++){
            
            if(empresas[i].nombre === user.empresa){                 
                setEmpresaActual(empresas[i])
             }
           }
        }, [empresas]);

      


      function handleSelect(e){
        setEmpresaSelect(e.currentTarget.value)
      }

      function handleEstado(e){
          console.log(e.currentTarget.value)
        setEstado(e.currentTarget.value)
      }

      function closeSession(){
          setUser(null)
      }



      async function handleUpdate(e) {
        e.preventDefault();
        setLoading1(true)
        const res = await fetch(
          "http://localhost:3500/api/users/update/" + user.mail,
          {
            method: "post",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("devops2021*:devops2021*"),
            },
    
            body: JSON.stringify({
              empresa: empresaSelect,
              
            }),
          }
        )
        const data = await res.json();
        
        setUser({...user, empresa:data.empresa})

      }



      async function agregarHistoria() {
        setLoading1(true)
        const res = await fetch(
          "http://localhost:3500/api/empresas/agregar/" + user.empresa,
          {
            method: "post",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("devops2021*:devops2021*"),
            },
    
            body: JSON.stringify({
              empresa: user.empresa,
              proyecto: proyectoActual.nombre,
              historias: {nombre:historiaNombreRef.current.value,
                         descripcion:historiaDescripcionRef.current.value,
                         tickets:{comentarios:ticketComentarioRef.current.value, estado:estado
                        }}
              
            }),
          }
        )
        const data = await res.json();
        

        for (var i = 0 ; i < data.proyectos.length ; i ++){
            if(data.proyectos[i].nombre === proyectoActual.nombre){                                
                setProyectoActual(data.proyectos[i])                
             }
           }   
        setLoading1(false)
      }



      async function agregarTicket() {
        setLoading1(true)
        
        const res = await fetch(
          "http://localhost:3500/api/empresas/agregarTicket/" + user.empresa,
          {
            method: "post",
            mode: "cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("devops2021*:devops2021*"),
            },
    
            body: JSON.stringify({
              empresa: user.empresa,
              proyecto: proyectoActual.nombre,
              historias: historiaActual.nombre,
              tickets:{comentarios:ticketComentarioRef1.current.value, estado:estado}
              
            }),
          }
        )
        const data = await res.json();

        for (var i = 0 ; i < data.proyectos.length ; i ++){
            if(data.proyectos[i].nombre === proyectoActual.nombre){                                
                for (var j = 0 ; j < data.proyectos[i].historias.length ; j ++){
                    if(data.proyectos[i].historias[j].nombre === historiaActual.nombre){ 
                        setHistoriaActual(data.proyectos[i].historias[j])
                    }
                }             
             }
           }    
           setLoading1(false)
        

        console.log(data)
        
      }


      function handleProject(e){
          var MyProject = e.currentTarget.id;          
          for (var i = 0 ; i < empresaActual.proyectos.length ; i ++){            
            if(empresaActual.proyectos[i].nombre === MyProject){  
                console.log(empresaActual.proyectos[i])               
                setProyectoActual(empresaActual.proyectos[i])                
             }
           }  
      }

      function handleHistory(e){
        var MyHistory = e.currentTarget.id; 
        for (var i = 0 ; i < proyectoActual.historias.length ; i ++){          
          if(proyectoActual.historias[i].nombre === MyHistory){                          
              setHistoriaActual(proyectoActual.historias[i])
           }
         }   
       }






      if (loading1) {
        return (
          <div className="loadingContainer-checkout">
            
            <Loader
              type="Rings"
              color="#00BFFF"
              height={150}
              width={150}
              timeout={6000}
            />
          </div>
        );
      }
    

    return(
        <div>

            {user.empresa != "" ?
             <div>
                <h1>Account</h1>
                <div>
                     <button onClick={closeSession}>Cerrar Sesión</button>
                 </div>
                <h3>Bienvenido {user.mail}</h3>
                <h3>Asociado a {user.empresa}</h3>


                <h3>Proyectos</h3>

                  {empresaActual ? empresaActual.proyectos.map((empresa)=>(
                    <div onClick={handleProject} id={empresa.nombre}>
                        {empresa.nombre}
                    </div>
                )):null}   

            <h3>Historias de Usuario  {proyectoActual.nombre ? "de " + proyectoActual.nombre : null}</h3>

            <button>Crear Historia de Usuario</button>
             <br></br>   
             <br></br>   
             <span>Nombre</span>   
            <input ref={historiaNombreRef}/>
            <br></br>  
            <br></br> 
            <span>Descripción</span>         
            <input ref={historiaDescripcionRef}/>
            <br></br>  
            <br></br>
            <span>Ticket</span>
            <br></br> 
            <span>Comentarios</span> 
            <input ref={ticketComentarioRef}/>
            <span>Estado</span> 
            <select onChange={handleEstado}>
                <option hidden selected>  Seleccione un estado   </option>
                <option value="Activo">Activo</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Finalizado">Finalizado</option>
            </select>
            <br></br>  
            <br></br>
            <button onClick={agregarHistoria}>Guardar</button>
            <br></br>
            <br></br>

                  {proyectoActual.historias ? proyectoActual.historias.map((historia)=>(
                    <div  onClick={handleHistory} id={historia.nombre}>
                        {historia.nombre}
                    </div>
                )):null}  

            <h3>Tickets</h3>

            <button>Crear Ticket</button>
             <br></br>   
             <br></br>   
            
            <span>Ticket</span>
            <br></br> 
            <span>Comentarios</span> 
            <input ref={ticketComentarioRef1}/>
            <span>Estado</span> 
            <select onChange={handleEstado}>
                <option hidden selected>  Seleccione un estado   </option>
                <option value="Activo">Activo</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Finalizado">Finalizado</option>
            </select>
            <br></br>  
            <br></br>
            <button onClick={agregarTicket}>Guardar</button>
            <br></br>
            <br></br>

             {historiaActual.tickets ? historiaActual.tickets.map((ticket)=>(
            <div>
                
                {ticket.estado}
                <br></br>
                {ticket.comentarios}
                <br></br>
                <br></br>
                
            </div>
            )):null}   

                 
            </div>:





             <div>
                 <h3>Bienvenido {user.mail}</h3>
                 <h3>Favor seleccione una empresa</h3>
                 <select onChange={handleSelect}>
                     {empresas.map((empresa) =>(
                         <option value={empresa.nombre}>
                             {empresa.nombre}
                        </option>
                     ))}
                 </select>
                 <button onClick={handleUpdate}>Asignar</button>


                 <br></br>
                 <div>
                     <button onClick={closeSession}>Cerrar Sesión</button>
                 </div>
             </div>}
            
       </div>
    )
}