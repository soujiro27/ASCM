import React,{Component} from 'react';
import axios from 'axios';
import submit from './../../functions/submit';
import Formulario from './form.js';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';
import './../../shared_styles/insert.styl'

export default class Asignacion extends Component {

  state = {
    modal:false,
    nombre:'',
    message:'',
    response:false,
  }

  formData = {
    idVolante:this.props.idVolante
  }

  OpenModal = () =>{
    if (this.state.nombre === 'ERROR') { return <ErrorForm visible={true} message={this.state.message} close={this.HandleCloseModal}/>}
    else if (this.state.nombre === 'SUCCESS') { return <SuccessForm visible={true}  close={this.HandleCloseModal}/>}
  }

  HandleOpenModal = (nombre) =>{
    this.setState({ modal:true, nombre});
  }

  HandleCloseModal = () => {
    this.state.response ? location.href = '/SIA/juridico/Asignacion' : this.setState({modal:false})
  }

  HandleSubmit = (event) => {
    event.preventDefault();
    let form_functions = new submit()
    let data = form_functions.createData_complete(document.getElementsByTagName('form'),this.formData)
    let url = `/SIA/juridico/Asignacion/Add`

    axios.post(url,data)
    .then(response =>{
      let respuesta = form_functions.resolve_request(response);
      this.setState(respuesta);
    })

  }

  HandleCancel = (event) => {
    event.preventDefault()
    location.href = `/SIA/juridico/${this.props.modulo}`
  }

  render(){
    console.log(this.state)
    return (<form onSubmit={this.HandleSubmit}>
      <Formulario {...this.props} cancel={this.HandleCancel}/>
        {
          this.state.modal &&
          <this.OpenModal />
        }
    </form>)
  }
}
