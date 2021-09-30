import React, {useContext} from "react";
import Home from "./Home";
import Login from "./Login";
import Account from "./Account";
import { BrowserRouter, Route, Redirect} from "react-router-dom";
import { MyContext } from "../Context/MyContext";



export default function Router() {

    const { user, setUser } = useContext(MyContext);

    return(

            <BrowserRouter>
                    <React.Fragment>
                    
                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>

                    

                  

                    <Route
                        exact
                        path="/cuenta"
                        render={() =>
                        user ? <Route component={Account} /> : <Route component={Login} />
                        }
                    />

                    <Route exact path="/login">
                        <Login />
                    </Route>

                   

                    
                    
                    </React.Fragment>
                    
                </BrowserRouter>
                )
        }