import React from "react";
import '../user_general/resources/css/contratacion.css';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';


class AgregarDescuento extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            empleados: [],
            tipoIngDesc: []
        };
        this.getEmpleados();
        this.getTipoIngreso_Descuento();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
       event.preventDefault();
       fetch("http://localhost:4000/api/Descuentos", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
            'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(res => { 
            console.log("Success: " + JSON.stringify(res));
            if(res)
            {
                this.clearInputs();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Agregado satisfactoriamente',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
        .catch(error => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Ha ocurrido un error',
                showConfirmButton: false,
                timer: 1500
            });
        });
    }

    getEmpleados()
    {
        fetch('http://localhost:4000/api/employee')
        .then(response => response.json())
        .then(data =>{
            if(data.length === 0){
              
            }else{
             this.setState({empleados: data});
            }
        });
    }

    getTipoIngreso_Descuento()
    {
        fetch('http://localhost:4000/api/tipoIngreso_Descuentos')
        .then(response => response.json())
        .then(data =>{
            if(data.length === 0){
              
            }else{
             this.setState({tipoIngDesc: data});
            }
        });
    }

    clearInputs()
    {
        document.getElementById("empleado").value = "0";
        document.getElementById("tipoDescuento").value = "0";
        document.getElementById("monto").value = "0";
    }

    render(){
        return <div className="container">
                    <h1>Descuentos</h1>
                    <form onSubmit={this.handleSubmit} className="row g-3" >
                        <div className="col-6">
                            <label className="form-label">Empleado</label>
                            <select name="empleado_id" id="empleado" onChange={this.handleChange} className="form-select">
                                <option value="0" defaultValue>---</option>
                                {this.state.empleados.map((item, index) => {
                                    if(item.status)
                                    {
                                        return <option key={index} value={item._id}>{item.name + " " + item.lastname}</option>
                                    }
                                })}
                            </select>
                        </div>
                        <div className="col-6">
                            <label className="form-label">Tipo de Descuento</label>
                            <select name="tipoDescuento" id="tipoDescuento" onChange={this.handleChange} className="form-select">
                                <option value="0" defaultValue>---</option>
                                {this.state.tipoIngDesc.map((item, index) => {
                                    if(item.status && item.tipoIngreso_Descuento === 2)
                                    {
                                        return <option key={index} value={item._id}>{item.descripcion}</option>
                                    }
                                })}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Monto</label>
                            <input name="monto" type="number" className="form-control" id="monto" onChange={this.handleChange} placeholder="Monto"/>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Agregar</button>
                        </div>
                    </form>
                </div>
    }
}

export default AgregarDescuento;