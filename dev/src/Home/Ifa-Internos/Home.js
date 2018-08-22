import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Table from '../../Components/Tablas/Container/Internos/Ifa';
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
    texto:'Registros Ifa',
    textoButton:'Nuevo Registro',
    'modulo':'Ifa'
}

export default Home
