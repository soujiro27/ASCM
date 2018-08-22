import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Table from '../../Components/Tablas/Container/Internos/Confronta';
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
    texto:'Registros Confronta',
    textoButton:'Nuevo Registro',
    'modulo':'Confronta'
}

export default Home
