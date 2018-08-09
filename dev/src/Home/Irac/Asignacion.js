import React, { Component } from 'react';
import Header from './../../Components/Header/Header-cedulas';


import Form from './../../Components/Insert/Asignacion/Asignacion';

class Home extends Component{


    render(){
        return(
            <div className="MainContainer">
                <Header {...this.props} />
                <Form id={this.props.id} modulo={this.props.modulo}/>
            </div>

        )
    }
}



Home.defaultProps = {
    texto:'Asignacion',
    menu:[
    	'Asignacion',
    	'Respuestas',
    	'Observaciones',
    	'Cedula'
    ],
    active:'Asignacion',
    modulo:'Irac'
}

export default Home
