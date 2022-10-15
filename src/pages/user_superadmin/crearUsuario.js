import React from "react";
import '../user_superadmin/resources/css/crearUsuario.css';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';

class crearUsuario extends React.Component{

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    }

    handleSubmit(event) {
       event.preventDefault();
       fetch('http://localhost:4000/api/employee/id/' + this.state.employee_id)
        .then(response => response.json())
        .then(data =>{
            if(data.length === 0){
              
            }else{
             this.setState({employee_id: data._id});
             fetch("http://localhost:4000/api/user", {
                    method: "POST",
                    body: JSON.stringify(this.state),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .catch(error => console.log("error: " + error))
                .then(response => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario creado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      this.clearInputs();

                });
            }
        });
       
    }

    clearInputs()
    {
        document.getElementById("cedula").value = "";
        document.getElementById("nombreUsuario").value = "";
        document.getElementById("contrasena").value = "";
        document.getElementById("rol").value = "";
    }

    render(){
        return <div className="container">
                <h1>Crear usuario</h1>
                <form className="row g-3" onSubmit={this.handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="cedula" className="form-label">Cédula del empleado</label>
                        <InputMask name="employee_id" className="form-control" id="cedula" onChange={this.handleChange} placeholder="000-0000000-0" mask="999-9999999-9"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="nombreUsuario" className="form-label">Nombre de usuario</label>
                        <input type="text" name="user" onChange={this.handleChange} className="form-control" id="nombreUsuario" placeholder="Nombre de usuario"/>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="contrasena" className="form-label">Contraseña</label>
                        <input type="password" name="password" onChange={this.handleChange} className="form-control" id="contrasena" placeholder="Contraseña"/>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="rol" className="form-label">Rol del usuario</label>
                        <select id="rol" name="rol" onChange={this.handleChange} className="form-select">
                        <option defaultValue>---</option>
                        <option value="admin">Admin</option>
                        <option value="usergeneral">Usuario general</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Agregar</button>
                    </div>
                </form>
            </div>
    }
}

export default crearUsuario;