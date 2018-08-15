import React, { Component } from 'react';
import Header from './../../Components/Header/Header-cedulas';

import Form from './../../Components/Insert/Respuestas/Respuestas';

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
let menu = []
let url = []

modulo == 'Confronta' || modulo == 'DocumentosDiversos' ? menu = ['Asignacion','Respuestas','Cedula'] : menu = ['Asignacion','Respuestas','Observaciones','Cedula'],
modulo == 'Confronta' || modulo == 'DocumentosDiversos' ? url = ['Asignacion','Respuestas',url_cedula] : url = ['Asignacion','Respuestas','Observaciones',url_cedula],

Home.defaultProps = {
    menu:menu,
    active:'Respuestas',
    id:localStorage.getItem('idVolante'),
    url:url
}


export default Home
