import { BrowserRouter, Route, Redirect, Switch, useLocation,useHistory,withRouter} from "react-router-dom";


export default function Home() {

    const history = useHistory();

    function handleSession(){
        history.push({
            pathname: `/cuenta`
          }) 
    }
    return(
        <div>
           <h1> Home </h1>
           <h3> Projects Manager</h3>
           <h3 onClick={handleSession}> Iniciar Sesión</h3>
       </div>
        
    )
}