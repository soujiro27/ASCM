import React, { Component } from 'react';
import Header from './../../Components/Header/Header-add';
import Table from '../../Components/Tablas/Container/Catalogos/SubDocumentos';
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
    texto:'Registros Sub-Documentos',
    textoButton:'Nuevo Registro',
    'modulo':'SubTiposDocumentos'
}

export default Home


