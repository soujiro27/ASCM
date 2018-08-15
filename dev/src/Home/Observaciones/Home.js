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


const modulo = localStorage.getItem('modulo')
const url_cedula = localStorage.getItem('modulo') + '/Cedula'

  Home.defaultProps = {
      texto:'Asignacion',
      menu:['Asignacion','Respuestas','Observaciones','Cedula'],
      active:'Observaciones',
      id:localStorage.getItem('idVolante'),
      url:['Asignacion','Respuestas','Observaciones',url_cedula],
  }

export default Home
