import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Form from './../../Components/Insert/Volantes/Volantes';

class Home extends Component{

    render(){
        return(
            <div className="MainContainer">
                <Header texto={this.props.texto} />
                <Form {...this.props} />
            </div>

        )
    }
}

Home.defaultProps = {
    texto:'Agregar Nuevo Registro',
}

export default Home
