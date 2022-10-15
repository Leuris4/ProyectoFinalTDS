import React from 'react';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import '../pages/resources/css/login.css'




class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {islogged:false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.islogged = this.islogged.bind(this)
    }

    islogged = () =>{
        let data =  document.cookie.split(";");
        if(data.length ===1){
        }else{
            let id =  data[0].split("=");
            if(id[1].length !== 0 ){
                this.setState({islogged: true});
            }
        }  
    }

    getData(user,password){
        fetch('http://localhost:4000/api/user/'+user+'/'+password)
        .then(response => response.json())
        .then(data =>{
            if(data.length === 0){
                Swal.fire(
                    'Credenciales Incorrectos',
                    'usuario o contraseña incorrecto',
                    'error'
                  )
            }else{
                let lastseen = {
                    last_seen: new Date()
                }
                fetch("http://localhost:4000/api/user/"+ data._id, {
                    method: "PUT",
                    body: JSON.stringify(lastseen),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .catch(error => console.log("error: " + error));
                document.cookie = "_id="+data.employee_id+"; path=/";
                document.cookie = "_rol="+data.rol+"; path=/";
                this.setState({islogged:true})
            }

        });
    }

    handleSubmit(event){
        this.getData(this.state.user, this.state.password);
        event.preventDefault();
    }

    handleChange = (event) =>{
        this.setState({[event.target.name] : event.target.value})
    }

    render() {
        if(this.state.islogged){
            return <Navigate to="/inicio"></Navigate>
        }else{
            return <section className="w3l-login">
               
                        <div className="overlay">
                            <div className="wrapper">
                                <div className="logo">
                                        {/* <Link to="/" className="brand-logo">Gestión RRHH</Link> */}
                                </div>
                                <div className="form-section">
                                    <h3>Iniciar Sesión </h3>
                            
                                    <form onSubmit={this.handleSubmit}  className="signin-form">
                                        <div className="form-input">
                                            <input type="text" name="user" onChange={this.handleChange}  placeholder="Nombre de usuario"  autoFocus />
                                        </div>
                                        <div className="form-input">
                                            <input type="password" name="password" onChange={this.handleChange} placeholder="Contraseña" />
                                        </div>
                                    
                                        <button type="submit" className="btn btn-primary theme-button mt-4">Iniciar Sesión</button>
                                        <div className="new-signup">
                                            <span  className="signuplink">Olvidaste tu contraseña?</span>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                        <div id='stars'></div>
                        <div id='stars2'></div>
                        <div id='stars3'></div>
                    </section>;
        }
    }

    componentDidMount(){
        setInterval(this.islogged(),100);
    }
}

export default Login;