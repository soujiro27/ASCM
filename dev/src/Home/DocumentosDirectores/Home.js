import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Table from '../../Components/Tablas/Container/Documentos/DocumentosDirectores';
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
    texto:'Registros Documentos',
    textoButton:'Nuevo Registro',
    'modulo':'Acciones'
}

export default Home
