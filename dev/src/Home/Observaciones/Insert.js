import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Form from './../../Components/Insert/Observaciones/Observaciones';

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
    texto:'Agregar Nueva Observacion',
    id:localStorage.getItem('idVolante'),
    modulo:localStorage.getItem('modulo')
}

export default Home
