import React, { Component } from 'react';
import axios from 'axios';
import submit from './../../functions/submit';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';
import Formulario from './form';
import './../../shared_styles/insert.styl'

class Insert extends Component{

    state = {
      modal:false,
      nombre:'',
      message:'',
      response:false,
    }

    OpenModal = () =>{
      if (this.state.nombre === 'ERROR') { return <ErrorForm visible={true} message={this.state.message} close={this.HandleCloseModal}/>}
      else if (this.state.nombre === 'SUCCESS') { return <SuccessForm visible={true}  close={this.HandleCloseModal}/>}
    }

    HandleCloseModal = () => {
      this.state.response ? location.href = '/SIA/juridico/Acciones' : this.setState({modal:false})
    }

    HandleCancel = (event) =>{
        event.preventDefault()
        location.href = '/SIA/juridico/Acciones'
    }


    HandleSubmit = (event) => {
      event.preventDefault();
      let form_functions = new submit()
      let data = form_functions.createData_complete(document.getElementsByTagName('form'),{})
      let url = `/SIA/juridico/Acciones/Add`
      axios.post(url,data)
      .then(response =>{
        let respuesta = form_functions.resolve_request(response);
        this.setState(respuesta);
      })
    }

  render(){
      return(
          <form className="form" onSubmit={this.HandleSubmit}>
              <Formulario cancel={this.HandleCancel}/>
                {
                  this.state.modal &&
                  <this.OpenModal />
                }
          </form>

      )
  }
}

export default Insert;
