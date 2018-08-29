import React, { Component } from 'react';
import axios from 'axios';
import submit from './../../functions/submit';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';
import Formulario from './form';

import './../../shared_styles/insert.styl'

class Update extends Component{

  state = {
    modal:false,
    nombre:'',
    message:'',
    response:false
  }


  OpenModal = () =>{
    if (this.state.nombre === 'ERROR') { return <ErrorForm visible={true} message={this.state.message} close={this.HandleCloseModal}/>}
    else if (this.state.nombre === 'SUCCESS') { return <SuccessForm visible={true}  close={this.HandleCloseModal}/>}
  }

    HandleSubmit = (event) => {
        event.preventDefault();
        let form_functions = new submit()
        let data = form_functions.createDataUpdate(document.getElementsByTagName('form'),'idVolante',this.props.datos[0].idVolante)

        axios.post('/SIA/juridico/Volantes/Update',data)
        .then(response =>{
          let respuesta = form_functions.resolve_request(response);
          this.setState(respuesta);
        })


    }

    HandleCancel = (event) =>{
        event.preventDefault()
        localStorage.removeItem('idVolante');
        location.href = '/SIA/juridico/Volantes'
    }

    HandleCloseModal = () =>{
      if(this.state.response){
        localStorage.removeItem('idVolante');
        location.href = '/SIA/juridico/Volantes';
      } else {
        this.setState({modal:false});
      }

    }

    render(){
        return(
            <form className="form" onSubmit={this.HandleSubmit}>
                <Formulario cancel={this.HandleCancel} {...this.props} />
                    {
                      this.state.modal &&
                      <this.OpenModal />
                    }
            </form>

        )
    }
}

export default Update;
