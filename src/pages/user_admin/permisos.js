import React from "react";
import '../user_admin/resources/css/permisos.css'
import Swal from 'sweetalert2';

class Permisos extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data: []};
        this.users = [];
        this.getData();
        this.auth = this.auth.bind(this);
        this.noData = false;
    }

    getData() {
        fetch('http://localhost:4000/api/pass')
        .then(response => response.json())
        .then(data =>{
            if(data.length === 0){
              
            }else{
                let cont = 0;
                data.map((datos) =>{
                    if(typeof datos.approval == "undefined") {
                        cont++;
                        fetch('http://localhost:4000/api/employee/dt/' + datos.employee_id)
                        .then(response => response.json())
                        .then(dt =>{
                            if(dt.length === 0){

                            }else{
                                let request_date = datos.request_date.split("T");
                                request_date = request_date[0];
                                let start_date = datos.start_date.split("T");
                                start_date = start_date[0];
                                let end_date = datos.end_date.split("T");
                                end_date = end_date[0];
                                let t = {
                                    _id: datos._id,
                                    cedula: dt.cedula,
                                    name: dt.name,
                                    lastname: dt.lastname,
                                    request_date: request_date,
                                    start_date: start_date,
                                    end_date: end_date,
                                    pass_type_id: datos.pass_type_id,
                                    approval: datos.approval
                                };
                                this.set_state(t);
                                
                            }
                        });
                    } 
                })
                console.log(cont);
                if(cont == 0)
                {
                    let vacio = '';
                    this.set_state(vacio);
                    this.noData = true;
                }
            }
        });
    }

    set_state(user) 
    {
        this.users.push(user);
        this.setState({data: this.users});
        console.log("User: " + JSON.stringify(this.state));
    }

    auth(event,id) {
         console.log("approval: " + event.target.value  + "id: " + id);
        let datos = {
            approval: event.target.value,
            approval_date: new Date()
        }
        fetch("http://localhost:4000/api/pass/" + id, {
                    method: "PUT",
                    body: JSON.stringify(datos),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .catch(error => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Lo sentimos, algo salió mal.',
                        showConfirmButton: false,
                        timer: 1500
                      })
                })
                .then(response => {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Listo!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                });
                this.users = [];
                this.getData();
    }
    

    render(){
        return <div className="container">
        <h1>Listado de permisos</h1>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Cédula</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Fecha de solicitud</th>
                            <th>Fecha de inicio</th>
                            <th>Fecha de fin</th>
                            <th>Tipo de permiso</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            this.state.data.map((pass, index) => {
                                if(this.state.data != '')
                                {
                                    console.log(this.state.data);
                                    return <tr key={index}>
                                        <td>{pass.cedula}</td>
                                        <td>{pass.name}</td>
                                        <td>{pass.lastname}</td>
                                        <td>{pass.request_date}</td>
                                        <td>{pass.start_date}</td>
                                        <td>{pass.end_date}</td>
                                        <td>{pass.pass_type_id}</td>
                                        <td>
                                            <div className="d-grid gap-2 d-md-block">
                                                <button className="btn btn-success btn-sm" value={true}   onClick={(e)=>this.auth(e,pass._id)} type="button">Autorizar</button>
                                                <button className="btn btn-danger btn-sm" value={false}  onClick={(e)=>this.auth(e,pass._id)} type="button">Rechazar</button>
                                            </div>
                                        </td>
                                    </tr>   
                                }
                                 
                            })
                        }
                        {this.noData ? (<tr>
                                        <td colSpan={8} className="err-msg">No hay permisos solicitados</td>
                                    </tr>) : (<></>)}
                    </tbody>
                </table>
            </div>
    }
}

export default Permisos;