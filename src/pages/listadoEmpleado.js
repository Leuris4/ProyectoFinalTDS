import React from "react";
import '../pages/resources/css/listadoEmpleado.css';
import Swal from 'sweetalert2';
import { BrowserRouter, Link, Navigate } from "react-router-dom";

class listadoEmpleado extends React.Component{
    
    constructor(props){
        super(props);
        this.state ={datos:[]}
        this.getData();
        this.desvincular = this.desvincular.bind(this);
        this.pagarNomina = this.pagarNomina.bind(this);
        this.users = [];
        this.noData = false;

    }
    getData(){
        fetch('http://localhost:4000/api/employee')
        .then(response => response.json())
        .then(data =>{
            if(data.length === 0){
              let vacio = '';
              this.set_state(vacio);
              this.noData = true;
            }else{
             this.setState({datos: data});
            
            }
        });
    }

    set_state(user) 
    {
        this.users.push(user);
        this.setState({data: this.users});
        console.log("User: " + JSON.stringify(this.state));
    }

    pagarNomina= () =>{
        fetch('http://localhost:4000/api/payroll')
        .then(response => response.json())
        .then(data =>{
            if(data.length !== 0){
                let datos =[];
                data.map((e)=>{
                    datos.push({
                        employee_id: e.employee_id,
                        date: new Date(),
                        payroll_id: e._id,
                        total_amount:  e.salary_net,                 
                    });
                })
                fetch("http://localhost:4000/api/bill", {
                    method: "POST",
                    body: JSON.stringify(datos),
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
                .then(response => 
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Pago realizado con exito',
                        showConfirmButton: false,
                        timer: 1500
                      }));
            }
        });
    } 


    desvincular = (event) =>{
        fetch("http://localhost:4000/api/employee/"+event.target.value, {
            method: "PUT",
            body: JSON.stringify({status: false}),
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
                title: 'El empleado ha sido desvinculado correctamente',
                showConfirmButton: false,
                timer: 1500
              });
              this.getData();
        });
    }

    render(){
        let usergeneral=false;
        if(this.props.rol ==="usergeneral"){
            usergeneral = true
        }
        return <div className="container">
            <div className="head">
                <h1>Listado de empleados</h1>
                <div id="btns">
                    {usergeneral ?(<button type="button" onClick={this.pagarNomina} id="pagar"  className="btn btn-success">Pagar</button>  ):(<></>)}
                  <Link type="button" id="imprimir-nomina" className="btn btn-secondary" to="/imprimirnomina">Imprimir nómina</Link>
                </div>
            </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Cédula</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Departamento</th>
                            <th>Cargo</th>
                            {usergeneral ?(<th>Acciones</th>):(<></>)}
                        </tr>
                    </thead>
                    <tbody>
                       {this.state.datos.map((employee,index)=>
                        {
                            console.log("Hola");
                            if(employee.status)
                                return <tr key={index}>
                                <td>{employee.cedula}</td>
                                <td>{employee.name}</td>
                                <td>{employee.lastname}</td>
                                <td>{employee.department}</td>
                                <td>{employee.position}</td>
                                {usergeneral ?(<td><button type="button" value={employee._id} id="desvincular" onClick={this.desvincular} className="btn btn-danger">Desvincular</button></td>):(<></>)}
                            </tr> 
                        } 
                        
                       )
                    }
                    {this.noData ? (<tr>
                                        <td colSpan={6} className="err-msg">No hay permisos solicitados</td>
                                    </tr>) : (<></>)}
                       
                        
                    </tbody>
                </table>
            </div>
    }
}
export default listadoEmpleado;