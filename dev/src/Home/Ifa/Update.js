import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Form from './../../Components/Update/Ifa/Ifa';

class Home extends Component{


    render(){
        return(
            <div className="MainContainer">
                <Header texto={this.props.texto} />
                <Form data={this.props.data}/>
            </div>

        )
    }
}

Home.defaultProps = {
    texto:'Actualizar Registro',
}

export default Home
