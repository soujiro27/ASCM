import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Form from './../../Components/Update/Volantes/Volantes';

class Home extends Component{


    render(){
        return(
            <div className="MainContainer">
                <Header {...this.props} />
                <Form data={this.props.data} 
                    caracteres={this.props.caracteres}
                    areas={this.props.areas}
                    acciones={this.props.acciones}
                    
                />   
            </div>

        )
    }
}

Home.defaultProps = {
    texto:'Actualizar Registro',
}

export default Home


