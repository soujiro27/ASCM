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
      },
      modals:{
        firmas:false,
      },
      textos:false,
      formData:{
        firmas:[]
      }
  }

  HandleSubmit = (event) => {
    event.preventDefault();

    let form_functions = new submit()
    let data = form_functions.createDataUpdate(document.getElementsByTagName('form'),'idDocumentoSiglas',this.props.data[0].idDocumentoSiglas)
    data.append('firmas',this.state.formData.firmas)
    data.append('texto',this.state.formData.texto)
    data.append('idVolante',this.props.data[0].idVolante)
    let url = '/SIA/juridico/Irac/Cedula/Update'

    axios.post(url,data)
    .then(response =>{
        let state_response = form_functions.resolve_request(response)
        this.setState(state_response)
    })

  }

  HandleCancel = (event) => {
    event.preventDefault()
    location.href = '/SIA/juridico/Irac'
  }

  HandleCloseModal = () => {
    if(this.state.modal.success){
      window.open('/SIA/jur/App/cedulas/irac_.php?param='+this.props.data[0].idVolante);
      window.open('/SIA/jur/App/cedulas/oficio_irac.php?param='+this.props.data[0].idVolante);
      location.href = `/SIA/juridico/Irac`
    } else{

        this.setState({
            modal:{visible:false}
        })
    }

  }

  OpenModalFirmas = (event) => {
    event.preventDefault()
    this.setState({modals:{firmas:true}})
  }

  CloseModalFirmas = (firmas) => {
      this.setState({
          modals:{firmas:false}
          ,formData:{firmas}
      })
  }


  PrintCedula = (event) =>{
      event.preventDefault()
      window.open('/SIA/jur/App/cedulas/irac_.php?param='+this.props.data[0].idVolante);
      window.open('/SIA/jur/App/cedulas/oficio_irac.php?param='+this.props.data[0].idVolante);

  }

  render(){
    return (<form onSubmit={this.HandleSubmit}>
    <Formulario
      data={this.props.data[0]}
      cancel={this.HandleCancel}
      OpenModalFirmas={this.OpenModalFirmas}
      OpenModalTextos={this.OpenModalTextos}
      PrintCedula={this.PrintCedula}
      />
      {
          this.state.modal.visible &&
          <Modal data={this.state.modal} close={this.HandleCloseModal}/>
      }
      {
        this.state.modals.firmas &&
        <ModalFirmas visible={true} close={this.CloseModalFirmas} />
      }
      {
        this.state.modals.textos &&
        <ModalTextos visible={true} close={this.CloseModalTextos} />
      }
    </form>)
  }
}
