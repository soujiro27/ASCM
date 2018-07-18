import React, { Component } from 'react';
import Header from './../../Components/Header/Header-add';
import Table from '../../Components/Tablas/Container/Catalogos/Acciones';
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
    texto:'Registros Acciones',
    textoButton:'Nuevo Registro',
    'modulo':'Acciones'
}

export default Home


