import React,{Component} from 'react';
import axios from 'axios';
import Formulario from './form.js';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';
import './../../shared_styles/insert.styl'
import submit from './../../functions/submit';

export default class Asignacion extends Component {

  state = {
    modal:false,
    nombre:'',
    message:'',
    response:false,
  }

  formData = {
    idVolante: sessionStorage.getItem('idVolante'),
    texto:''
  }

  OpenModal = () =>{
    if (this.state.nombre === 'ERROR') { return <ErrorForm visible={true} message={this.state.message} close={this.HandleCloseModal}/>}
    else if (this.state.nombre === 'SUCCESS') { return <SuccessForm visible={true}  close={this.HandleCloseModal}/>}
  }

  HandleCloseModal = () =>{
    this.state.response ? location.href = '/SIA/juridico/Observaciones' : this.setState({modal:false})
  }

  HandleSubmit = (event) => {
    event.preventDefault();
    let div = document.getElementsByClassName('fr-element');
    let html = div[0].innerHTML;
    this.formData['texto'] = html;
    let form_functions = new submit()
    let data = form_functions.createData_complete(document.getElementsByTagName('form'),this.formData)
    let url = '/SIA/juridico/Observaciones/Save'

    axios.post(url,data)
    .then(response =>{
      let respuesta = form_functions.resolve_request(response);
      this.setState(respuesta);
    })

  }

  HandleCancel = (event) => {
    event.preventDefault()
    location.href = `/SIA/juridico/Observaciones`
  }

  render(){
    return (<form onSubmit={this.HandleSubmit}>
      <Formulario cancel={this.HandleCancel}/>
        {
          this.state.modal &&
          <this.OpenModal />
        }
    </form>)
  }
}
