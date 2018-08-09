import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Form from './../../Components/Update/Observaciones/Observaciones';

class Home extends Component{


    render(){
        return(
            <div className="MainContainer">
                <Header {...this.props} />
                <Form data={this.props.data} modulo={this.props.modulo}/>
            </div>

        )
    }
}

Home.defaultProps = {
    texto:'Actualizar Registro',
}

export default Home
