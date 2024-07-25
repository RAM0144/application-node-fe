import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import PropTypes from "prop-types";
import Students from './pages/Student.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

// routecomponent which load the routes only when the authStatus 
//is authenticated else it will navigated to login page

const ProtectedRoute = ({ routeElement }) => {

   const authStatus = localStorage.getItem("authStatus");

   if (authStatus === "authenticated") {
    return routeElement;
   }
   
   return <Navigate to="/login" />
};
 ProtectedRoute.propTypes = {
  routeElement: PropTypes.element,
 };

function App() {
  return (
  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute routeElement={<Home />} />} />
          <Route path="/students" element={<ProtectedRoute routeElement={<Students />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    
  )
}

export default App;
