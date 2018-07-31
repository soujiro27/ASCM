import React, { Component } from 'react';
import Header from './../../Components/Header/Header-add-volantes';
import Table from '../../Components/Tablas/Container/Volantes/Volantes';
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
    texto:'Registros Volantes',
    textoButton:'Nuevo Registro',
    'modulo':'Volantes'
}

export default Home


