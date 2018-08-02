import React, { Component } from 'react';
import Header from './../../Components/Header/Header-Documentos';
import Form from './../../Components/Update/DocumentosGral/DocumentosGral';

class Home extends Component{

    state = {
        modalAnexo:false
    }

    openModalAnexo = () => {
        this.setState({modalAnexo:true})
    }

    CloseModalFile = () =>{
        this.setState({modalAnexo:false})
    }

    render(){
        return(
            <div className="MainContainer">
                <Header {...this.props} modalAnexo={this.openModalAnexo} />
                <Form data={this.props.data} openModalAnexo={this.state.modalAnexo} CloseModalAnexo={this.CloseModalFile}/>   
            </div>

        )
    }
}

Home.defaultProps = {
    texto:'Documentos',
}

export default Home


