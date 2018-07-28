import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Form from './../../Components/Insert/SubDocumentos/SubDocumentos';

class Home extends Component{

    render(){
        return(
            <div className="MainContainer">
                <Header {...this.props} />
                <Form  data={this.props.data} />   
            </div>

        )
    }
}

Home.defaultProps = {
    texto:'Agregar Nuevo Registro',
}

export default Home


