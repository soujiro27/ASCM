import React, { Component } from 'react';
import axios from 'axios';
import submit from './../../functions/submit';
import Formulario from './form';

import AddRemitenteModal from './../../Modals/Add-Remitente';
import RemitentesModal from './../../Modals/remitentes';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';

import './../../shared_styles/insert.styl'

class Insert extends Component{


  state = {
    modal:false,
    nombre:'',
    message:'',
    response:false,
  }

  formData = {
    idRemitenteJuridico:'',
    idRemitente:'',
  }


  OpenModal = () =>{
    if(this.state.nombre === 'REMITENTE'){ return <RemitentesModal  close={this.closeModalRemitente}/>}
    else if (this.state.nombre === 'REMITENTEADD') { return <AddRemitenteModal  close={this.closeModalBolean}/>}
    else if (this.state.nombre === 'ERROR') { return <ErrorForm visible={true} message={this.state.message} close={this.HandleCloseModal}/>}
    else if (this.state.nombre === 'SUCCESS') { return <SuccessForm visible={true}  close={this.HandleCloseModal}/>}
  }

  closeModalRemitente = (value) => {
    this.formData = value;
    this.setState({modal:false});
  }

  closeModalBolean = () => {
    this.setState({modal:false});
  }

  HandleOpenModal = (nombre) =>{
    this.setState({ modal:true, nombre});
  }

    HandleSubmit = (event) => {
      event.preventDefault();

      let form_functions = new submit()
      let data = form_functions.createData_complete(document.getElementsByTagName('form'),this.formData)

      axios.post('/SIA/juridico/VolantesDiversos/Save',data)
      .then(response =>{
        let respuesta = form_functions.resolve_request(response);
        this.setState(respuesta);
      })
    }

    HandleCloseModal = () =>{
      this.state.response ? location.href = '/SIA/juridico/VolantesDiversos' : this.setState({modal:false})
    }

    HandleCancel = (event) =>{
        event.preventDefault()
        location.href = '/SIA/juridico/VolantesDiversos'
    }


    render(){
        return(
            <form className="form" onSubmit={this.HandleSubmit}>
                <Formulario
                    cancel={this.HandleCancel}
                    openModal={this.HandleOpenModal}
                    {...this.props}
                />
                {
                  this.state.modal &&
                  <this.OpenModal />
                }
            </form>

        )
    }
}

export default Insert;
