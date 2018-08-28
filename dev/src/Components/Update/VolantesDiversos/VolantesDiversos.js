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

  HandleCloseModal = () =>{
    if(this.state.response){
      localStorage.removeItem('idVolante');
      location.href = '/SIA/juridico/VolantesDiversos';
    } else {
      this.setState({modal:false});
    }

  }

  closeModalRemitente = (value) => {
    this.formData = value;
    this.setState({modal:false});
  }

  HandleSubmit = (event) => {
    event.preventDefault();
    let form_functions = new submit()
    let data = form_functions.createDataUpdateFormData(document.getElementsByTagName('form'),'idVolante',this.props.datos[0].idVolante,this.formData)
    axios.post('/SIA/juridico/VolantesDiversos/Update',data)
    .then(response =>{
      let respuesta = form_functions.resolve_request(response);
      this.setState(respuesta);
    })
  }

  HandleCancel = (event) =>{
      event.preventDefault()
      localStorage.removeItem('idVolante');
      location.href = '/SIA/juridico/VolantesDiversos'
  }

    render(){
        return(
            <form className="form" onSubmit={this.HandleSubmit}>
                <Formulario {...this.props} openModal={this.HandleOpenModal} cancel={this.HandleCancel} />
                    {
                      this.state.modal &&
                      <this.OpenModal />
                    }

            </form>

        )
    }
}

export default Update;
