import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Form from './../../Components/Update/DocumentosGral/DocumentosGral';

class Home extends Component{

    state = {
        modalAnexo:false,
    }

    render(){
        
        return(
            <div className="MainContainer">
                <Header {...this.props}  />
                <Form 
                    id={this.props.id}
                />   
            </div>

        )
    }
}

Home.defaultProps = {
    texto:'Documentos Digitalizados',
}

export default Home


