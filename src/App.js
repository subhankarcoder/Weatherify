import React from "react";
import "./App.css";
// import { BrowserRouter as Routes,Router, Route } from "react-router-dom";
import Menu from "../src/components/Menu/Menu";
import Dashboard from "../src/components/Dashboard/Dashboard";
import MapCom from "../src/components/Map/Map"

function App() {
  return (
    <>
    {/* <Routes> */}
        <div className="holder">
          <Menu />
          <Dashboard />
        </div>
      {/* </Routes> */}
    </>
  );
}

export default App;
