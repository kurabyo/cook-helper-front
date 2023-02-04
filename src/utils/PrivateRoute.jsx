import { Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  let { user } = useContext(AuthContext);
  return <Routes {...rest}>{!user ? <Navigate to="/login" /> : children}</Routes>;
};

export default PrivateRoute;