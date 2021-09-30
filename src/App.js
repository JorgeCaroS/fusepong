import logo from './logo.svg';
import './App.css';
import React from "react";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import Router from "./Components/Router";
import { MyContext } from "./Context/MyContext";

function App() {

  const [user, setUser] = useState(null);

  return (
    <MyContext.Provider
      value={{        
        user,setUser,        
      }}
    >

      <Router/>

  </MyContext.Provider>
  );
}

export default App;
