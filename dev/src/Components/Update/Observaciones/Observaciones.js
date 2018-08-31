import React, { Component } from 'react';
import axios from 'axios';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';
import submit from './../../functions/submit';
import Formulario from './form';

import './../../shared_styles/insert.styl';

class Update extends Component{

  state = {
    modal:false,
    nombre:'',
    message:'',
    response:false
  }

  formData = {
    idObservacion:this.props.idObservacion,
    texto:''
  }

  OpenModal = () =>{
    if (this.state.nombre === 'ERROR') { return <ErrorForm visible={true} message={this.state.message} close={this.HandleCloseModal}/>}
    else if (this.state.nombre === 'SUCCESS') { return <SuccessForm visible={true}  close={this.HandleCloseModal}/>}
  }

    HandleCancel = (event) =>{
        event.preventDefault()
        location.href = `/SIA/juridico/Observaciones`
    }

    HandleCloseModal = () =>{
      if(this.state.response){
        location.href = '/SIA/juridico/Observaciones';
      } else {
        this.setState({modal:false});
      }

    }

    HandleSubmit = (event) => {
      event.preventDefault();

      let div = document.getElementsByClassName('fr-element');
      let html = div[0].innerHTML;
      this.formData['texto'] = html;

      let form_functions = new submit()
      let data = form_functions.createDataUpdateFormData(document.getElementsByTagName('form'),'idObservacionDoctoJuridico',this.props.data.idObservacionDoctoJuridico,this.formData)
      data.append('texto',html)
      let url = '/SIA/juridico/Observaciones/Update'

      axios.post(url,data)
      .then(response =>{
        let respuesta = form_functions.resolve_request(response);
        this.setState(respuesta);
      })

    }

    render(){
        return(
        <form onSubmit={this.HandleSubmit}>
            <Formulario {...this.props}  cancel={this.HandleCancel}/>
              {
                this.state.modal &&
                <this.OpenModal />
              }
        </form>
    )
    }
}

export default Update;
