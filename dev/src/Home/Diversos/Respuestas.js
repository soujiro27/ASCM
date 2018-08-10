import React, { Component } from 'react';
import Header from './../../Components/Header/Header-cedulas';

import Form from './../../Components/Insert/Respuestas/Respuestas';

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
    	'Cedula'
    ],
    active:'Respuestas',
    modulo:'DocumentosDiversos'
}

export default Home
