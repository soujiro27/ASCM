import React, { Component } from 'react';
import Header from './../../Components/Header/Header-add';
import Table from '../../Components/Tablas/Container/Catalogos/Textos';
class Home extends Component{

    render(){
        return(
            <div className="MainContainer">
                <Header {...this.props} />
                <Table {...this.props}/>
            </div>

        )
    }
}

Home.defaultProps = {
    texto:'Registros Textos',
    textoButton:'Nuevo Registro',
    'modulo':'Textos'
}

export default Home
