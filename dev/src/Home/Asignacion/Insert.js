import React, { Component } from 'react';
import Header from './../../Components/Header/Header-cedulas';


import Form from './../../Components/Insert/Asignacion/Asignacion';

class Home extends Component{

    render(){
        return(
            <div className="MainContainer">
                <Header {...this.props} />
                <Form id={this.props.id} />
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
    id:localStorage.getItem('idVolante'),
}

export default Home
