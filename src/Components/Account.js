import React, {  useState,useContext, useEffect } from "react";
import { MyContext } from "../Context/MyContext";
import Loader from "react-loader-spinner";
import "../index.css";
import Logo from "../images/fusepong.png";

export default function Account() {

    const {user, setUser} = useContext(MyContext); 
    const [empresas, setEmpresas] = useState([]);
    const [empresaSelect, setEmpresaSelect] = useState([]);
    const [empresaActual, setEmpresaActual] = useState([]);
    const [proyectoActual, setProyectoActual] = useState([]);
    const [historiaActual, setHistoriaActual] = useState([]);
    const [ticketActual, setTicketActual] = useState([]);
    const [estado, setEstado] = useState([]);
    const [estadoUpdate, setEstadoUpdate] = useState([]);
    const [loading1, setLoading1] = useState(true);
    const [historiaClassname, setHistoriaClassname] = useState("hidden");
    const [createHistoryClassname, setCreateHistoryClassname] = useState("hidden");
    const [createTicketClassname, setCreateTicketClassname] = useState("hidden");
    const [ticketsClassname, setTicketsClassname] = useState("hidden");
    const [editTicketClassname, setEditTicketClassname] = useState("hidden");
    
    
    
    
   

    let historiaNombreRef = React.createRef();
    let historiaDescripcionRef = React.createRef();    
    let ticketComentarioRef = React.createRef();     
    let ticketComentarioRef1 = React.createRef(); 
    let ticketComentarioRef2 = React.createRef(); 


    async function fetchData() {
        
        const result = await fetch("http://3.85.248.60:3500/api/empresas", {
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
        console.log(e.currentTarget.value)
        setEmpresaSelect(e.currentTarget.value)
      }

      function handleEstado(e){
          console.log(e.currentTarget.value)
        setEstado(e.currentTarget.value)
      }

      function handleEstadoUpdate(e){
        console.log(e.currentTarget.value)
       setEstadoUpdate(e.currentTarget.value)
    }

      function closeSession(){
          setUser(null)
      }



      async function handleUpdate(e) {
        e.preventDefault();
        setLoading1(true)
        console.log("Asignar")
        console.log(user)
        console.log(empresaSelect)
        const res = await fetch(
          "http://3.85.248.60:3500/api/users/update/" + user.mail,
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
        console.log(data)
        
        setUser({...user, empresa:data.empresa})
        setLoading1(false)
        
      }



      async function agregarHistoria() {
        setLoading1(true)
        const res = await fetch(
          "http://3.85.248.60:3500/api/empresas/agregar/" + user.empresa,
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
          "http://3.85.248.60:3500/api/empresas/agregarTicket/" + user.empresa,
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
        closeCreateTicket();
        
      }


      function handleProject(e){
        setHistoriaClassname("account-history")
          var MyProject = e.currentTarget.id;          
          for (var i = 0 ; i < empresaActual.proyectos.length ; i ++){            
            if(empresaActual.proyectos[i].nombre === MyProject){  
                console.log(empresaActual.proyectos[i])               
                setProyectoActual(empresaActual.proyectos[i])                
             }
           }  
      }

      function handleHistory(e){
        setTicketsClassname("account-tickets")
        
        var MyHistory = e.currentTarget.id; 
        for (var i = 0 ; i < proyectoActual.historias.length ; i ++){          
          if(proyectoActual.historias[i].nombre === MyHistory){                          
              setHistoriaActual(proyectoActual.historias[i])
           }
         }   
       }

       function closeHistory(){
         setHistoriaClassname("hidden")
       }


       function createHistory(){
         setCreateHistoryClassname("account-create-history")
       }

       function createTicket(){
        setCreateTicketClassname("account-create-ticket")
      }

       function closeCreateHistory(){
        setCreateHistoryClassname("hidden")
       }

       function closeTickets(){
         setTicketsClassname("hidden")
       }

       function closeCreateTicket(){
         setCreateTicketClassname("hidden")
       }

       function closeEditTicket(){
         setEditTicketClassname("hidden")
       }

       async function handleTicketClassname(e){
         console.log(e.target.id)
         var MyTicket = e.target.id;
         setEditTicketClassname("edit-ticket")

         for(var i = 0 ; i< historiaActual.tickets.length; i++){
          
            if(historiaActual.tickets[i]._id === MyTicket){
            setTicketActual(historiaActual.tickets[i])
           }           
         
         }

       }

       async function updateTicket(){

        setLoading1(true)
          const res = await fetch(
          "http://3.85.248.60:3500/api/empresas/editarTicket/",
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
              ticketId:ticketActual._id,
              tickets:{comentarios:ticketComentarioRef2.current.value, estado:estadoUpdate}

              
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
         closeEditTicket();

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
        <div className="account-container">
          <img src={Logo}/>

            {user.empresa != "" ?
             <div>
                <h1>Cuenta</h1>
                <div className="account-header">
                
                <h3>Bienvenido {user.mail}</h3>
                <h3>Asociado a {user.empresa}</h3>
                <div>
                     <button onClick={closeSession}>Cerrar Sesión</button>
                 </div>
                </div>

              <div className="account-projects">
                <h1>Proyectos</h1>

                  {empresaActual.proyectos ? empresaActual.proyectos.map((empresa)=>(
                    <div className="single-project" onClick={handleProject} id={empresa.nombre}>
                        {empresa.nombre}
                    </div>
                )):null} 
                </div>  
            

            
            <div className={createHistoryClassname} > 
            <button className="close-create-history" onClick={closeCreateHistory}>Volver</button> 
            <h2>Creear Historia para {proyectoActual.nombre}</h2>
             <span>Nombre</span>   
            <input ref={historiaNombreRef}/>
            <br></br>  
            <br></br> 
            <span>Descripción</span>         
            <input ref={historiaDescripcionRef}/>
            <br></br>  
            <br></br>
            <span>Tickets</span>
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
            <button className="add-history-button" onClick={agregarHistoria}>Guardar</button>
            <br></br>
            <br></br>
            </div>  

            <div className={historiaClassname}>   
            <h2>Creear Historia para {historiaActual.nombre}</h2>  
             <button className="close-history-button" onClick={closeHistory}>Volver</button>    
             <button className="create-history-button" onClick={createHistory}>Crear Nueva Historia</button> 
            
            <h3>Historias de Usuario  {proyectoActual.nombre ? "de " + proyectoActual.nombre : null}</h3>

                  {proyectoActual.historias ? proyectoActual.historias.map((historia)=>(
                    <div className="single-history" onClick={handleHistory} id={historia.nombre}>
                        {historia.nombre}
                    </div>
                )):null}  

            

                </div>
            <div className={ticketsClassname}>  
            <button className="close-history-button" onClick={closeTickets}>Volver</button>  
            <button className="create-history-button" onClick={createTicket}>Crear Nuevo Ticket</button>         
            <h3>Tickets  {historiaActual.nombre ? "de : " + historiaActual.nombre : null}</h3>

            {historiaActual.tickets ? historiaActual.tickets.map((ticket)=>(
            <div  className="single-ticket" >   
              <span onClick={handleTicketClassname} id={ticket._id}className="material-icons md-dark" >     edit    </span>             
                <span>Estado :{ticket.estado}</span>
                <span>Comentarios :{ticket.comentarios}</span>
                
            </div>
            )):null}  

          </div>

          <div className={createTicketClassname}>  
          <h2>Creear Ticket para : {historiaActual.nombre}</h2> 
          <button className="close-history-button" onClick={closeCreateTicket}>Volver</button>   
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
            </div>   


            <div className={editTicketClassname}>
            <button className="close-edit-ticket-button" onClick={closeEditTicket}>Volver</button>   
            <h1>Editar Ticket</h1>
            {/* <h3>{ticketActual._id}</h3> */}
            <h3>Comentarios </h3>
            <input ref={ticketComentarioRef2} defaultValue={ticketActual.comentarios}></input>
            <select onChange={handleEstadoUpdate}>
              <option hidden selected>  {ticketActual.estado}   </option>
              <option value="Activo">Activo</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Finalizado">Finalizado</option>
             </select>
            <br></br>
            <button className="close-edit-ticket-button" onClick={updateTicket}>Editar</button> 
            </div>     
            

              

                 
            </div>:





             <div>
                 <h3>Bienvenido {user.mail}</h3>
                 <h3>Favor seleccione una empresa</h3>
                 <select onChange={handleSelect}>
                 <option hidden selected>  Selecciona una Empresa   </option>
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