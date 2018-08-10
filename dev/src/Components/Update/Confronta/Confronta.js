import React,{Component} from 'react';
import axios from 'axios';
import Formulario from './form.js';
import Modal from './../../Modals/form'
import ModalFirmas from './../../Modals/FirmasCedula'
import ModalTextos from './../../Modals/TextoPromocion'

import './../../shared_styles/insert.styl'
import submit from './../../functions/submit';

export default class Asignacion extends Component {

  state = {
      "modal":{
          "visible":false,
          "message":"",
          "class":"",
          "icon":"",
          "success":false
      }
  }

  HandleSubmit = (event) => {
    event.preventDefault();

    let form_functions = new submit()
    let data = form_functions.createDataUpdate(document.getElementsByTagName('form'),'idConfrontaJuridico',this.props.data[0].idConfrontaJuridico)
    data.append('idVolante',this.props.data[0].idVolante)
    let url = '/SIA/juridico/Confronta/Cedula/Update'

    axios.post(url,data)
    .then(response =>{
        let state_response = form_functions.resolve_request(response)
        this.setState(state_response)
    })

  }

  HandleCancel = (event) => {
    event.preventDefault()
    location.href = '/SIA/juridico/confrontasJuridico'
  }

  HandleCloseModal = () => {
    if(this.state.modal.success){
        window.open('/SIA/jur/App/cedulas/Confronta.php?param1='+this.props.data[0].idVolante);
      location.href = `/SIA/juridico/confrontasJuridico`
    } else{

        this.setState({
            modal:{visible:false}
        })
    }

  }

  PrintCedula = (event) =>{
      event.preventDefault()
      window.open('/SIA/jur/App/cedulas/Confronta.php?param1='+this.props.data[0].idVolante);


  }

  render(){
    return (<form onSubmit={this.HandleSubmit}>
    <Formulario
      data={this.props.data[0]}
      cancel={this.HandleCancel}
      PrintCedula={this.PrintCedula}
      nota={this.props.nota}
      />
      {
          this.state.modal.visible &&
          <Modal data={this.state.modal} close={this.HandleCloseModal}/>
      }
    </form>)
  }
}
