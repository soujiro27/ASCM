import React, { Component } from 'react';
import Header from './../../Components/Header/Header-cedulas';


import Form from './../../Components/Insert/Irac/Irac';

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


const modulo = localStorage.getItem('modulo')
const url_cedula = localStorage.getItem('modulo') + '/Cedula'

Home.defaultProps = {
    texto:'Irac',
    menu:['Asignacion','Respuestas','Observaciones','Cedula'],
    active:'Cedula',
    id:localStorage.getItem('idVolante'),
    url:['Asignacion','Respuestas','Observaciones',url_cedula],
}

export default Home
