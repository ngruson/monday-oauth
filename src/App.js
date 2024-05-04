import React from "react";
import "./App.css";
import "monday-ui-react-core/dist/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Secure from "./components/Secure";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Secure />} path="/secure" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;