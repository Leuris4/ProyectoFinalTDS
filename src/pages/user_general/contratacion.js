import React from "react";
import '../user_general/resources/css/contratacion.css';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';

class Contratacion extends React.Component{

    constructor(props) {
        super(props);
        this.state = {hired_date: new Date()};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
       event.preventDefault();
       fetch("http://localhost:4000/api/employee", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).catch(error => console.log("error: " + error))
    .then(response => { 
        console.log("Success: " + JSON.stringify(response));
        if(response.status)
        {
            let afp = this.state.salario * 0.0287;
            let ars = this.state.salario * 0.0304;
            let neto = this.state.salario - ars - afp;
            let data = {
                employee_id: response._id,
                salary_brut: this.state.salario,
                salary_net: neto,
                ars: ars,
                afp: afp
            };
            fetch("http://localhost:4000/api/payroll", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).catch(error => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Lo sentimos, algo salió mal',
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
            .then(response => {
                this.clearInputs();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Empleado contratado satisfactoriamente',
                    showConfirmButton: false,
                    timer: 1500
                  })
            })
        }
    });
       
    
    }
    clearInputs()
    {
        document.getElementById("cedula").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("departamento").value = "";
        document.getElementById("cargo").value = "";
        document.getElementById("Salario").value = "";
    }

    render(){
        return <div className="container">
                    <h1>Formulario de contratación</h1>
                    <form onSubmit={this.handleSubmit} className="row g-3" >
                        <div className="col-12">
                            <label className="form-label">Cédula</label>
                            <InputMask name="cedula" className="form-control" id="cedula" onChange={this.handleChange} placeholder="000-0000000-0" mask="999-9999999-9"/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Nombre</label>
                            <input name="name" type="text" className="form-control" id="nombre" onChange={this.handleChange} placeholder="Nombres"/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Apellido</label>
                            <input name="lastname" type="text" className="form-control" id="apellido" onChange={this.handleChange} placeholder="Apellidos"/>
                        </div>
                        <div className="col-6">
                            <label className="form-label">Departamento</label>
                            <input name="department" type="text" className="form-control" id="departamento" onChange={this.handleChange} placeholder="Departamento"/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Cargo</label>
                            <input name="position" type="text" className="form-control" id="cargo" onChange={this.handleChange} placeholder="Puesto de trabajo"/>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Salario</label>
                            <input name="salario" type="number" className="form-control" id="Salario"  onChange={this.handleChange} placeholder="Salario"/>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Agregar</button>
                        </div>
                    </form>
                </div>
    }
}

export default Contratacion;