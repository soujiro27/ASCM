import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Form from './../../Components/Update/SubDocumentos/SubDocumentos';

class Home extends Component{


    render(){
        return(
            <div className="MainContainer">
                <Header texto={this.props.texto} />
                <Form {...this.props}/>   
            </div>

        )
    }
}

Home.defaultProps = {
    texto:'Actualizar Registro',
}

export default Home


