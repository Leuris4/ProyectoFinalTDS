import React from "react";
import "../user_general/resources/css/imprimir.css"

class ImprimirNomina extends React.Component{
    constructor(props){
        super(props);
        this.state ={datos:[]}
        this.getDatos();
    }
    
    getDatos(){
        console.log("HOla");
     let datos = [];
        fetch('http://localhost:4000/api/payroll')
        .then(response => response.json())
        .then(data =>{
            if(data.length === 0){
              
            }else{
              data.map((e)=>{
                fetch('http://localhost:4000/api/employee/d/'+e.employee_id)
                .then(response => response.json())
                .then(o =>{
                    if(o.length === 0){
                      
                    }else{
                        datos.push({
                            cedula: o.cedula,
                            name: o.name,
                            lastname: o.lastname,
                            department: o.department,
                            position: o.position,
                            salary_brut: e.salary_brut,
                            afp: e.afp,
                            ars: e.ars,
                            salary_net: e.salary_net
                        })

                     this.setState({datos: datos});
                    }
                });
              })
            
            }
        });
    }

    

    render(){
        return <>
    <div className="container">
        <h1>Nómina</h1>
        <button className="btn btn-primary ocultar derecha" onClick={(e) => window.print()}>Imprimir</button>
        <table className="table">
            <thead>
                <tr>
                    <th>Cédula</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Departamento</th>
                    <th>Cargo</th>
                    <th>Salario Bruto</th>
                    <th>ARS</th>
                    <th>AFP</th>
                    <th>Salario Neto</th>
                </tr>
            </thead>
            <tbody>
               {this.state.datos.map((e)=>{
                    return <tr>
                                <td>{e.cedula}</td>
                                <td>{e.name}</td>
                                <td>{e.lastname}</td>
                                <td>{e.department}</td>
                                <td>{e.position}</td>
                                <td>{e.salary_brut}</td>
                                <td>{e.afp}</td>
                                <td>{e.ars}</td>
                                <td>{e.salary_net}</td>
                            </tr>
               })}
            </tbody>
        </table>
    </div>
    </>
    }

    componentDidMount(){
        this.getDatos();
    }
}

export default ImprimirNomina;