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
        firmas:[],
      }
  }

  HandleSubmit = (event) => {
    event.preventDefault();

    let form_functions = new submit()
    let data = form_functions.createData(document.getElementsByTagName('form'))
    data.append('idVolante',this.props.id)
    data.append('firmas',this.state.formData.firmas)
    data.append('texto',this.state.formData.texto)
    let url = '/SIA/juridico/Irac/Cedula/add'

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
        window.open('/SIA/jur/App/cedulas/irac_.php?param='+this.props.id)
        window.open('/SIA/jur/App/cedulas/oficio_irac.php?param='+this.props.id)
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

  render(){
    return (<form onSubmit={this.HandleSubmit}>
    <Formulario
      cancel={this.HandleCancel}
      OpenModalFirmas={this.OpenModalFirmas}
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
