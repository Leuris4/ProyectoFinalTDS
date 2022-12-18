import React from "react";
import '../user_general/resources/css/contratacion.css';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';

class CrearTipoIngrDesc extends React.Component{

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
       event.preventDefault();
       fetch("http://localhost:4000/api/tipoIngreso_Descuentos", {
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
    clearInputs()
    {
        document.getElementById("descripcion").value = "";
        document.getElementById("tipoIngreso_Descuento").value = "0";
    }

    render(){
        return <div className="container">
                    <h1>Tipo ingreso/descuento</h1>
                    <form onSubmit={this.handleSubmit} className="row g-3" >
                        <div className="col-12">
                            <label className="form-label">Descripción</label>
                            <input name="descripcion" type="text" className="form-control" id="descripcion" onChange={this.handleChange} placeholder="Descripción"/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Tipo</label>
                            <select name="tipoIngreso_Descuento" id="tipoIngreso_Descuento" onChange={this.handleChange} className="form-select">
                                <option value="0" defaultValue>---</option>
                                <option value="1">Ingreso</option>
                                <option value="2">Descuento</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Agregar</button>
                        </div>
                    </form>
                </div>
    }
}

export default CrearTipoIngrDesc;