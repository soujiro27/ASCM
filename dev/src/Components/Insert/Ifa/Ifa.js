import React,{Component} from 'react';
import axios from 'axios';
import Formulario from './form.js';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';
import ModalFirmas from './../../Modals/FirmasCedula'
import ModalTextos from './../../Modals/TextoPromocion'
import IfaPreview from './../../Modals/IfaPreview';

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
    firmas:'',
    texto:'',
    idVolante:this.props.idVolante
  }

  OpenModal = () =>{
    if(this.state.nombre === 'FIRMAS'){ return <ModalFirmas visible={true} close={this.closeModalBolean} closeModalFirmas={this.closeModalFirmas}/>}
    else if (this.state.nombre === 'TEXTOS') { return <ModalTextos close={this.closeModalBolean} closeModalTextos={this.closeModalTextos}/>}
    else if (this.state.nombre === 'PREVIEW') { return <IfaPreview close={this.closeModalBolean} idVolante={this.props.idVolante} firmantes={this.formData['firmas']} texto={this.formData['texto']} />}
    else if (this.state.nombre === 'ERROR') { return <ErrorForm visible={true} message={this.state.message} close={this.HandleCloseModal}/>}
    else if (this.state.nombre === 'SUCCESS') { return <SuccessForm visible={true}  close={this.HandleCloseModal}/>}
  }

  closeModalBolean = () => {
    this.setState({modal:false});
  }

  HandleOpenModal = (nombre) =>{
    this.setState({ modal:true, nombre});
  }

  HandleCancel = (event) => {
    event.preventDefault()
    location.href = '/SIA/juridico/Ifa'
  }

  closeModalFirmas = (firmas) => {
    if(firmas.length > 0 ) this.formData['firmas'] = firmas;
    this.setState({modal:false});
  }

  closeModalTextos = (texto) =>{
    if(texto > 0 ) this.formData['texto'] = texto;
    this.setState({modal:false});
  }

  HandleCloseModal = () =>{
    if(this.state.response){
      window.open('/SIA/jur/App/cedulas/IFA.php?param='+this.props.idVolante);
      location.href = '/SIA/juridico/Ifa';
    } else {
      this.setState({modal:false})
    }
  }

  HandleSubmit = (event) => {
    event.preventDefault();

    let form_functions = new submit()
    let data = form_functions.createData_complete(document.getElementsByTagName('form'),this.formData)
    let url = '/SIA/juridico/Ifa/Save'

    axios.post(url,data)
    .then(response =>{
      let respuesta = form_functions.resolve_request(response);
      this.setState(respuesta);
    })

  }



  render(){
    console.log(this.formData)
    return (
      <div className="cedula-container row">
        <form onSubmit={this.HandleSubmit} className="col-lg-12">
          <Formulario cancel={this.HandleCancel} open={this.HandleOpenModal}  data={this.props.data[0]} prev={this.prev} />
            {
              this.state.modal &&
              <this.OpenModal />
            }
        </form>
      </div>
    )
  }

}
