import React, { Component } from 'react';
import axios from 'axios';
import submit from './../../functions/submit';
import Formulario from './form';

import AddRemitenteModal from './../../Modals/Add-Remitente';
import RemitentesModal from './../../Modals/remitentes';

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
    else if (this.state.nombre === 'REMITENTEADD') { return <NotaModal visible={true} close={this.closeModalBolean}/>}
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
        let data = form_functions.createData(document.getElementsByTagName('form'))
        data.append('file', document.getElementById('file').files[0]);
        let url = '/SIA/juridico/VolantesDiversos/save'

        axios.post(url,data)
        .then(response =>{
            let state_response = form_functions.resolve_request(response)
            console.log(state_response)
            this.setState(state_response)

        })
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
