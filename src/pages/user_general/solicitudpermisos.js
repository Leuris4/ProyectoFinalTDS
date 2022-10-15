import React from "react";
import '../user_general/resources/css/solicitudpermisos.css';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';


class solicitudPermisos extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            request_date: new Date(),
            datos: []
        }
        this.getData();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getData() {
        fetch('http://localhost:4000/api/pass_type')
        .then(response => response.json())
        .then(data =>{
            if(data.length === 0){
              
            }else{
             this.setState({datos: data});
            }
        });
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch("http://localhost:4000/api/pass", {
                    method: "POST",
                    body: JSON.stringify(this.state),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .catch(error => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Lo sentimos, algo salió mal',
                        showConfirmButton: false,
                        timer: 1500
                      })
                })
                .then(response => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Permiso solicitado satisfactoriamente',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      this.clearInputs();
                });
    }

    clearInputs()
    {
        document.getElementById("cedula").value = "";
        document.getElementById("fecha_inicio").value = "";
        document.getElementById("fecha_fin").value = "";
        document.getElementById("tipoPermiso").value = "";
    }

    render(){
        return <div className="container">
                <h1>Solicitud de permisos</h1>
                <form className="row g-3" onSubmit={this.handleSubmit}>
                    <div className="col-12">
                        <label className="form-label">Cédula</label>
                        <InputMask name="employee_id" className="form-control" id="cedula" onChange={this.handleChange} placeholder="000-0000000-0" mask="999-9999999-9"/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Inicio del permiso</label>
                        <input name="start_date" type="date" onChange={this.handleChange} className="form-control" id="fecha_inicio" placeholder="Fecha de inicio"/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Fin del permiso</label>
                        <input name="end_date" type="date" onChange={this.handleChange} className="form-control" id="fecha_fin" placeholder="Fecha de fin"/>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Tipo de permiso</label>
                        <select name="pass_type_id" id="tipoPermiso" onChange={this.handleChange} className="form-select">
                        <option defaultValue>---</option>
                        {this.state.datos.map((pass_type, index) => {
                            return <option key={index} value={pass_type.type}>{pass_type.type}</option>
                        }
                        )}
                        </select>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Agregar</button>
                    </div>
                </form>
            </div>
    }
}

export default solicitudPermisos;