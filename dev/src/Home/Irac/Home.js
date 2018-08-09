import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Table from '../../Components/Tablas/Container/Cedulas/Irac';
class Home extends Component{

    render(){
        return(
            <div className="MainContainer">
                <Header {...this.props} />
                <Table/>
            </div>

        )
    }
}

Home.defaultProps = {
    texto:'Registros Irac',
    textoButton:'Nuevo Registro',
    'modulo':'Irac'
}

export default Home
