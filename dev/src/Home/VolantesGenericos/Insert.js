import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Form from './../../Components/Insert/VolantesDiversos/VolantesDiversos';

class Home extends Component{

    render(){
        return(
            <div className="MainContainer">
                <Header {...this.props} />
                <Form  
                    data={this.props.documentos} 
                    caracteres={this.props.caracteres}
                    areas={this.props.areas}
                    acciones={this.props.acciones}
                />   
            </div>

        )
    }
}

Home.defaultProps = {
    texto:'Agregar Nuevo Registro',
}

export default Home


