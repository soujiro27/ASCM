import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Form from './../../Components/Insert/Observaciones/Observaciones';

class Home extends Component{

    render(){
        return(
            <div className="MainContainer">
                <Header {...this.props} />
                <Form />
            </div>

        )
    }
}

Home.defaultProps = {
    texto:'Agregar Nueva Observacion',
}

export default Home
