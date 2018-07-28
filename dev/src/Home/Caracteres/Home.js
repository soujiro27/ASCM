import React, { Component } from 'react';
import Header from './../../Components/Header/Header-add';
import Table from '../../Components/Tablas/Container/Catalogos/Caracteres';
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
    texto:'Registros Caracteres',
    textoButton:'Nuevo Registro',
    'modulo':'Caracteres'
}

export default Home


