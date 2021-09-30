import React, {  useState,useContext, useEffect } from "react";
import { useHistory} from "react-router-dom";

import { MyContext } from "../Context/MyContext";

export default function Login() {

    const {user, setUser} = useContext(MyContext); 
    const history = useHistory();

    let mailRef = React.createRef();
    let passwordRef = React.createRef();
    let mail1Ref = React.createRef();
    let password1Ref = React.createRef();



    function handleReg(e){
        console.log(e)
       
        e.preventDefault();
        fetch("http://localhost:3500/api/users/register", {
          method: "post",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Authorization": "Basic "+btoa("devops2021*:devops2021*"),
            "Content-Type": "application/json",
            
          },         
          body: JSON.stringify({           
            mail: mailRef.current.value,
            password: passwordRef.current.value, 
            empresa:"",
          })
        }).then((response) => {         
          if (response.status === 201) {             
            console.log("Si")
            alert("Registrado con Exito, ya puede Iniciar Sesión")
            history.push({
              pathname: `/cuenta`
            })  
            }else{            
                console.log("No")
            };
      }); 
    }



    
    async function handleLog(e){ 
            
        e.preventDefault();

        
         var thisError;
        var myUser = user;   
        try{  
        const myFetch = await fetch("http://localhost:3500/api/users/login", {
           method: "post",
           mode: "cors",
           headers: {
             Accept: "application/json",           
             "Authorization": "Basic "+btoa("devops2021*:devops2021*"),
            "Content-Type": "application/json", 
           },    
          
           body: JSON.stringify({            
             mail: mail1Ref.current.value,
             password: password1Ref.current.value,            
           }),
         }).then(response => response.json()).then(json => myUser=json) }  catch(err){
           thisError = "error";
         }
 
         console.log(thisError)
 
         if(thisError === "error"){
            console.log(thisError)
         }else{
            console.log(myUser)
             localStorage.setItem("MyUser",JSON.stringify({mail:myUser.mail, empresa:myUser.empresa})); 
            setUser({mail:myUser.mail, empresa:myUser.empresa}); 
            history.push({
                pathname: `/cuenta`
              })  
         } 
 
                
     }  
 


    return(
        <div className="login-container">
            <h1>Login</h1>
            <div className="forms-container">

        <div className="login-form">
          <form className="login-form">
            <h1>Registrarse</h1>
            <span className="text">Correo</span>
            <input type="text" id="mail-register" ref={mailRef} />
            <span className="text">Contraseña</span>
            <input type="password" id="password-register" ref={passwordRef} />
            <br></br>
            
            <button className="register-button" onClick={handleReg}> <p> Registrarse </p> </button>
            <br></br>
            
          </form>
          </div>

          <div className="login-form">
          <form className="login-form">
            <h1>Login</h1>
            <span className="text">Correo</span>
            <input type="text" id="mail-login"ref={mail1Ref} />
            <span className="text">Contraseña</span>
            <input type="password" id="password-login" ref={password1Ref}/>
            <br></br>
            <button className="login-button" onClick={handleLog}> <p> Iniciar Sesión  </p></button>
           
            <br></br>
            
            
          </form>
          </div>

          
          <br></br>
          
         
          
        </div>
            </div>
    )
}