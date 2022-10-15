import React, { useEffect,useState } from 'react';
import './App.css';

import { BrowserRouter,Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import Home from './pages/home';
import Contratacion from './pages/user_general/contratacion';
import SolicitudPermisos from './pages/user_general/solicitudpermisos';
import CrearUsuario from './pages/user_superadmin/crearUsuario';
import ListadoEmpleado from './pages/listadoEmpleado';
import Permisos from './pages/user_admin/permisos';
import Logout from './pages/logout';
import Login from './pages/login';
import ImprimirNomina from './pages/user_general/imprimirNomina';



function App(){
  const [logueado, setlogueado] = useState(false)
  const [rol, setRol] = useState("")
  
  const islogged = () =>{
      let data =  document.cookie.split(";");
      if(data.length ===1){
          // no hay cookies
      }else{
          let id =  data[0].split("=");          
          let rol =  data[1].split("=");          
          if(id[1].length !== 0 ){
            setlogueado(true);
            setRol(rol[1]);
          }
      }  
    }
 
    useEffect(() => {
      setInterval(() => {
        islogged();
      }, 100);
    }, []);

    if(logueado){
      let general = false;
      let admin = false;
      let superadmin = false;
      if(rol == "usergeneral")
      general = true;
      if(rol == "admin")
      admin = true;
      if(rol == "superadmin")
      superadmin = true;
      
      return <BrowserRouter>
            <Navbar islogged = {logueado} rol = {rol} />
            <Routes>
              <Route path="/" element={<Login/>} /> 
              <Route path="/login" element={<Login/>} /> 
              <Route path="/inicio" element={<Home rol = {rol}/>} /> 
              {general ? (<Route path="/contratacion" element={<Contratacion/>} />) : (<></>)}
              {general ? (<Route path="/solicitudPermisos" element={<SolicitudPermisos/>} />) : (<></>)} 
              {superadmin ? (<Route path="/crearUsuario" element={<CrearUsuario/>} />) : (<></>)} 
              {general || admin ? (<Route path="/empleados" element={<ListadoEmpleado rol = {rol}/>} />) : (<></>)} 
              {admin ? (<Route path="/permisos" element={<Permisos/>} />) : (<></>)} 
              {general || admin ? (<Route path="/imprimirnomina" element={<ImprimirNomina/>} />) : (<></>)} 
              <Route path="/logout" element={<Logout/>} /> 
              <Route path="*" element={<Home />}></Route>
            </Routes>
          </BrowserRouter>;
    }else{
      return <BrowserRouter>
              <Routes>
                      <Route path="/" element={<Login/>} /> 
                      <Route path="/login" element={<Login/>} /> 
                      <Route path="*" element={<Login />}></Route>
                    </Routes>
              </BrowserRouter>;
    }
  
}

export default App;
