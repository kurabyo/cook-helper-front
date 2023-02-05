// import Content from "./components/Content/Content";
// import Navigation from "./components/Navigation/Navigation";
// import './App.css'
// import Ingredients from "./components/Ingredients/Ingredients";

// function App() {
//   return (
//     <div className="App">
//       <Navigation />
//       <Content />
//       <Ingredients />
//     </div>
//   );
// }

// export default App;

import React from "react";
import "./index.css";
import Navigation from "./components/Navigation/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./views/homePage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import Content from "./components/Content/Content";
import Ingredients from './components/Ingredients/Ingredients'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <AuthProvider>
          <Navigation />
          <Routes>
            <Route element={<Login/>} path="/login" />
            <Route element={<Register/>} path="/register" />
            <Route element={<Home/>} path="/" />
            <Route element={<Content/>} path="/meals" />
            <Route element={<Ingredients/>} path="/ingredients" />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
