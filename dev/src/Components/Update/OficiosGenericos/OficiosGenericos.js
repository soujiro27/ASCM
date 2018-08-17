import React,{Component} from 'react';
import axios from 'axios';
import Formulario from './form.js';
import Modal from './../../Modals/form'
import ModalInternos from './../../Modals/CopiasInternos'
import ModalExternos from './../../Modals/CopiasExternos'

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
        internos:false,
        externos:false
      },
      formData:{
        internos:[],
        externos:[]
      }
  }

  HandleSubmit = (event) => {
    event.preventDefault();

    let div = document.getElementsByClassName('fr-element')
    let html = div[0].innerHTML

    let form_functions = new submit()
    let data = form_functions.createDataUpdate(document.getElementsByTagName('form'),'idPlantillaJuridico',this.props.data[0].idPlantillaJuridico)
    data.append('idVolante',this.props.data[0].idVolante)
    data.append('texto',html)
    data.append('copias',this.state.formData.internos.concat(this.state.formData.externos))
    let url = '/SIA/juridico/DocumentosDiversos/Cedula/Update'

    axios.post(url,data)
    .then(response =>{
        let state_response = form_functions.resolve_request(response)
        this.setState(state_response)
    })

  }

  HandleCancel = (event) => {
    event.preventDefault()
    location.href = '/SIA/juridico/DocumentosDiversos'
  }

  HandleCloseModal = () => {
    if(this.state.modal.success){
        window.open('/SIA/jur/App/cedulas/OFICIO.php?param='+this.props.data[0].idVolante)
        location.href = `/SIA/juridico/DocumentosDiversos`
    } else{

        this.setState({
            modal:{visible:false}
        })
    }

  }

  OpenModalInternos = (event) =>{
    event.preventDefault()
    this.setState({modals:{internos:true}})
  }

  closeModalInternos = (values) => {
    this.setState({
      modals:{internos:false},
      formData:{
        internos:values,
        externos:this.state.formData.externos
      }
    })
  }

  OpenModalExternos = (event) =>{
    event.preventDefault()
    this.setState({modals:{externos:true}})
  }

  closeModalExternos = (values) => {
    this.setState({
      modals:{externos:false},
      formData:{
        externos:values,
        internos:this.state.formData.internos
      }
    })
  }


  render(){

    return (<form onSubmit={this.HandleSubmit}>
    <Formulario
      cancel={this.HandleCancel}
      data={this.props.data}
      OpenModalInternos={this.OpenModalInternos}
      OpenModalExternos={this.OpenModalExternos}
      />
      {
          this.state.modal.visible &&
          <Modal data={this.state.modal} close={this.HandleCloseModal}/>
      }
      {
        this.state.modals.internos &&
        <ModalInternos visible={true} close={this.closeModalInternos} />
      }

      {
        this.state.modals.externos &&
        <ModalExternos visible={true} close={this.closeModalExternos} />
      }
    </form>)
  }
}
