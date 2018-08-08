import React, { Component } from 'react';
import Header from './../../Components/Header/Header-cedulas';

import Table from './../../Components/Tablas/Container/Observaciones/Observaciones';

class Home extends Component{


    render(){
        return(
            <div className="MainContainer">
                <Header {...this.props} />
                <Table id={this.props.id} modulo={this.props.modulo}/>
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
    active:'Observaciones',
    modulo:'Ifa'
}

export default Home
