import React, { Component } from 'react';
import Header from './../../Components/Header/Header-add';
import Table from '../../Components/Tablas/Container/Turnos/Turnos';
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
    texto:'Registros Turnos',
    textoButton:'Nuevo Registro',
    'modulo':'Turnos'
}

export default Home;
