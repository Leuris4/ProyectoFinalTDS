import React from "react";
import '../resources/css/listadoEmpleado.css';
import Swal from 'sweetalert2';
import { BrowserRouter, Link, Navigate } from "react-router-dom";

class Descuentos extends React.Component{
    
    constructor(props){
        super(props);
        this.state ={datos: []}
        this.getData();
        this.users = [];
        this.noData = false;

    }
    getData(){
        fetch('http://localhost:4000/api/Descuentos')
        .then(response => response.json())
        .then(data =>{
            if(data.length === 0){
              let vacio = '';
              this.set_state(vacio);
              this.noData = true;
            }else{
                let datos = [];
                data.map(item => {
                    fetch('http://localhost:4000/api/employee/d/' + item.empleado_id)
                    .then(response => response.json())
                    .then(data =>{
                        if(data.length === 0){
                        let vacio = '';
                        this.set_state(vacio);
                        this.noData = true;
                        }else{
                            fetch('http://localhost:4000/api/tipoIngreso_Descuentos/dt/' + item.tipoDescuento)
                            .then(response => response.json())
                            .then(dat =>{
                                if(dat.length === 0){
                                let vacio = '';
                                this.set_state(vacio);
                                this.noData = true;
                                }else{
                                    datos.push({
                                        tipoDescuento: dat.descripcion,
                                        monto: item.monto,
                                        empleado: data.name + " " + data.lastname,
                                        fecha: item.fecha,
                                        status: item.status,
                                        id: item._id
                                    });
                                    this.setState({datos: datos});
                                }
                            });
                        }
                    });
                });
            }
        });
    }

    set_state(user) 
    {
        this.users.push(user);
        this.setState({data: this.users});
    }

    autorizar = (event) =>
    {
        console.log("Value: " + event.target.value);
        console.log("id: " + event.target.id);
        if(event.target.id === "autorizar")
        {
            fetch("http://localhost:4000/api/Descuentos/" + event.target.value, {
                method: "PUT",
                body: JSON.stringify({status: 1}),
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
                console.log(response);
                fetch("http://localhost:4000/api/payroll/" + response.empleado_id)
                .then(res => res.json())
                .then(gPayroll => { 
                    var desc = gPayroll.otrosDescuentos === undefined? 0: parseFloat(gPayroll.otrosDescuentos);
                    desc += parseFloat(response.monto);
                    var salary_net = parseFloat(gPayroll.salary_net) - response.monto;
                    fetch("http://localhost:4000/api/payroll/" + gPayroll.employee_id, {
                    method: "PUT",
                    body: JSON.stringify({otrosDescuentos: desc, salary_net: salary_net}),
                    headers: {
                        'Content-Type': 'application/json'
                        }
                    })
                    .then(pPayroll => { 
                        console.log("pPayroll: " + JSON.stringify(pPayroll));
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Autorizado correctamente',
                            showConfirmButton: false,
                            timer: 1500
                          });
                          this.getData();
                    })
                })
            });
        }else if(event.target.id === "rechazar")
        {
            fetch("http://localhost:4000/api/Descuentos/actv/" + event.target.value)
            .then(resp => resp.json())
            .then(resp => {
                if(resp.status)
                {
                    fetch("http://localhost:4000/api/Descuentos/" + event.target.value, {
                        method: "PUT",
                        body: JSON.stringify({status: 2}),
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
                        console.log(response);
                        fetch("http://localhost:4000/api/payroll/" + response.empleado_id)
                        .then(res => res.json())
                        .then(gPayroll => { 
                            var desc = gPayroll.otrosDescuentos === undefined? 0: parseFloat(gPayroll.otrosDescuentos);
                            desc -= parseFloat(response.monto);
                            var salary_net = parseFloat(gPayroll.salary_net) + response.monto;
                            fetch("http://localhost:4000/api/payroll/" + gPayroll.employee_id, {
                            method: "PUT",
                            body: JSON.stringify({otrosDescuentos: desc, salary_net: salary_net}),
                            headers: {
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(pPayroll => { 
                                console.log("pPayroll: " + JSON.stringify(pPayroll));
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Autorizado correctamente',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                this.getData();
                            })
                        })
                    });
                }else {
                    fetch("http://localhost:4000/api/Descuentos/" + event.target.value, {
                        method: "PUT",
                        body: JSON.stringify({status: 2}),
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
                        console.log(response);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Rechazado correctamente',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        this.getData();
                    });
                }
            });
        }
    }

    render(){
        let admin=false;
        if(this.props.rol ==="admin"){
            admin = true
        }
        let usergeneral=false;
        if(this.props.rol ==="usergeneral"){
            usergeneral = true
        }
        // console.log(this.props.rol);
        return <div className="container">
            <div className="head">
                <h1>Descuentos</h1>
                <div id="btns">
                    {/* {usergeneral ?(<button type="button" onClick={this.pagarNomina} id="pagar"  className="btn btn-success">Pagar</button>  ):(<></>)} */}
                    {usergeneral ? (<Link type="button" id="agregarDescuento" className="btn btn-primary" to="/agregarDescuento">Crear Nuevo</Link>):(<></>)}
                </div>
            </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Empleado</th>
                            <th>Monto</th>
                            <th>Tipo Descuento</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            {admin ?(<th>Acciones</th>):(<></>)}
                        </tr>
                    </thead>
                    <tbody>
                       {this.state.datos.map((descuento,index)=>
                        {
                            let fecha = new Date();
                            let anoActual = fecha.getFullYear();
                            let mesActual = fecha.getMonth() + 1;
                            var fechaDesde = new Date(mesActual + "/" + "01/" + anoActual);
                            var descuentoFecha = new Date(descuento.fecha);
                            if(descuentoFecha >= fechaDesde && descuentoFecha <= fecha)
                            {
                                return (
                                    <tr key={index}>
                                        <td>{descuento.empleado}</td>
                                        <td>{descuento.monto}</td>
                                        <td>{descuento.tipoDescuento}</td>
                                        <td>{new Date(descuento.fecha).toLocaleDateString()}</td>
                                        <td>{descuento.status === 0? "Sin Autorizar": descuento.status === 1? "Autorizado": "Rechazado"}</td>
                                        {admin ?
                                            (<td>
                                                {descuento.status === 0 ?
                                                 <button type="button" value={descuento.id} id="autorizar" onClick={this.autorizar} className="btn btn-success">Autorizar</button> : (<></>)}
                                                {/* <button type="button" value={descuento.id} id="autorizar" onClick={this.autorizar} className="btn btn-success">Autorizar</button> */}
                                                {descuento.status === 0  || descuento.status === 1 ? 
                                                <button type="button" value={descuento.id} id="rechazar" onClick={this.autorizar} className="btn btn-danger">Rechazar</button> : (<></>)}
                                                {/* <button type="button" value={descuento.id} id="rechazar" onClick={this.autorizar} className="btn btn-danger">Rechazar</button> */}
                                            </td>):(<></>)}
                                    </tr> )
                            }
                        } 
                        
                       )
                    }
                    {this.noData ? (<tr>
                                        <td colSpan={5} className="err-msg">No hay Descuentos</td>
                                    </tr>) : (<></>)}
                       
                        
                    </tbody>
                </table>
            </div>
    }
}
export default Descuentos;