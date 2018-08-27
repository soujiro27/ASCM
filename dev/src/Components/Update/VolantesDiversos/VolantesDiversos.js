import React, { Component } from 'react';
import axios from 'axios';
import submit from './../../functions/submit';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';
import Formulario from './form';
import RemitentesModal from './../../Modals/remitentes';

import './../../shared_styles/insert.styl'

class Update extends Component{

  state = {
    modal:false,
    nombre:'',
    message:'',
    response:false
  }

  formData = {
    idRemitente:this.props.datos[0].idRemitente,
    idRemitenteJuridico:this.props.datos[0].idRemitenteJuridico,
  }

  OpenModal = () =>{
    if(this.state.nombre === 'REMITENTE'){ return <RemitentesModal  close={this.closeModalRemitente}/>}
    else if (this.state.nombre === 'ERROR') { return <ErrorForm visible={true} message={this.state.message} close={this.HandleCloseModal}/>}
    else if (this.state.nombre === 'SUCCESS') { return <SuccessForm visible={true}  close={this.HandleCloseModal}/>}
  }

  HandleOpenModal = (nombre) =>{
    this.setState({ modal:true, nombre});
  }

  closeModalRemitente = (value) => {
    this.formData = value;
    this.setState({modal:false});
  }

    render(){
        return(
            <form className="form" onSubmit={this.HandleSubmit}>
                <Formulario
                    {...this.props}
                      openModal={this.HandleOpenModal}
                    />
                    {
                      this.state.modal &&
                      <this.OpenModal />
                    }

            </form>

        )
    }
}

export default Update;
