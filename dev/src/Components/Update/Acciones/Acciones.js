import React, { Component } from 'react';
import axios from 'axios';
import submit from './../../functions/submit';
import Formulario from './form';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';
import './../../shared_styles/insert.styl';

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

  HandleCancel = (event) =>{
      event.preventDefault()
      location.href = '/SIA/juridico/Acciones'
  }


  HandleCloseModal = () =>{
    this.state.response ? location.href = '/SIA/juridico/Acciones' : this.setState({modal:false});
  }

  HandleSubmit = (event) => {
    event.preventDefault();
    let form_functions = new submit()
    let data = form_functions.createDataUpdateFormData(document.getElementsByTagName('form'),'idAccion',this.props.data.idAccion,{})
    let url = '/SIA/juridico/Acciones/Update'
    axios.post(url,data)
    .then(response =>{
      let respuesta = form_functions.resolve_request(response);
      this.setState(respuesta);
    })

  }


    render(){
        return(
        <form onSubmit={this.HandleSubmit}>
            <Formulario data={this.props.data}  cancel={this.HandleCancel}/>
              {
                this.state.modal &&
                <this.OpenModal />
              }
        </form>
    )
    }
}

export default Update;
