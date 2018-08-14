import React, { Component } from 'react';
import Header from './../../Components/Header/Header-cedulas';

import Table from './../../Components/Tablas/Container/Observaciones/Observaciones';

class Home extends Component{


    render(){
        return(
            <div className="MainContainer">
                <Header {...this.props} />
                <Table id={this.props.id} />
            </div>

        )
    }
}



Home.defaultProps = {
    menu:['Asignacion','Respuestas','Observaciones','Cedula'],
    active:'Observaciones',
    id:localStorage.getItem('idVolante'),
}

export default Home
