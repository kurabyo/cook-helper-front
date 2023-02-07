import React, { useState, useEffect} from "react";
import "./index.css";
import Navigation from "./components/Navigation/Navigation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./views/homePage";
import Login from "./views/loginPage";
import Register from "./views/registerPage";
import Ingredients from './components/Ingredients/Ingredients'
import PrivateRoute from "./utils/PrivateRoute";
import Meals from "./components/Content/Meals/Meals";
import OneMeal from "./components/Content/Meals/OneMeal/OneMeal";
import { API } from "./utils/useAxios";
import CreateMeal from "./components/CreateMeal/CreateMeal";
// import AddIngredientsToMeal from "./components/CreateMeal/AddIngredientsToMeal";

function App() {

  const [data, setData] = useState();

  const refreshMeals = () => {
    API.get("meals/")
      .then((res) => {
        setData(res.data)
      })
      .catch(console.error);
  };

  useEffect(() => {
    refreshMeals();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <AuthProvider>
          <Navigation />
          <Routes>
            <Route element={<Login/>} path="/login" />
            <Route element={<Register/>} path="/register" />
            <Route element={<Home/>} path="/" />
            <Route element={data && <Meals data={data}/>} path="/meals" />                    
            <Route element={data && <OneMeal data={data}/>} path="/meals/:id" />                    
            <Route element={<PrivateRoute><Ingredients /></PrivateRoute>} path="ingredients"/>
            <Route element={<PrivateRoute><CreateMeal /></PrivateRoute>} path="createmeal"/>
            {/* <Route element={<PrivateRoute><AddIngredientsToMeal /></PrivateRoute>} path="ingrsetup"/> */}
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
