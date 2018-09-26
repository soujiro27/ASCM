import React,{Component} from 'react';
import axios from 'axios';
import Formulario from './form.js';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';
import Firmas from './../../Modals/FirmaGenericos';
import ModalInternos from './../../Modals/CopiasInternos'
import Preview from './../../Modals/NotaGenericaPreview'

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
    Internos:'',
    Externos:'',
    texto:'',
    idVolante:this.props.idVolante,
    copias:'',
    firmas:''

  }

  OpenModal = () =>{
    if(this.state.nombre === 'INTERNOS'){ return <ModalInternos   tipo='I' close={this.closeModalRemitente} closeModalCopias={this.closeModalCopias} />}
    else if(this.state.nombre === 'EXTERNOS'){ return <ModalInternos   tipo='E' close={this.closeModalRemitente} closeModalCopias={this.closeModalCopias} />}
    else if(this.state.nombre === 'FIRMAS'){ return <Firmas    close={this.closeModalRemitente} closeModalCopias={this.closeModalCopias} />}
    else if (this.state.nombre === 'ERROR') { return <ErrorForm visible={true} message={this.state.message} close={this.HandleCloseModal}/>}
    else if (this.state.nombre === 'SUCCESS') { return <SuccessForm visible={true}  close={this.HandleCloseModal}/>}
    else if (this.state.nombre === 'PREVIEW') { return <Preview  close={this.closeModalRemitente} idVolante={this.props.idVolante} />}
  }

  HandleCloseModal = () =>{
    if(this.state.response) {
      window.open(`/SIA/jur/App/Cedulas/OFICIO_GENERICO.php?param=${this.props.idVolante}`);
      location.href = '/SIA/juridico/DocumentosDiversos' 
    } 

    this.setState({modal:false})
  }

  HandleOpenModal = (nombre) =>{
    this.setState({modal:true,nombre});
  }

  closeModalCopias = (modal,value) => {
    this.formData[modal]= value;
    this.setState({modal:false});
  }
 
  closeModalRemitente = () => { 
    this.setState({modal:false});
  }
 
  HandleSubmit = (event) => {
    event.preventDefault();

    let div = document.getElementsByClassName('fr-element');
    let html = div[0].innerHTML;
    this.formData['texto'] = html;
    this.formData['idVolante'] = this.props.idVolante;
    this.formData['copias'] = this.formData['Internos'] + this.formData['Externos'];

    let form_functions = new submit()
    let data = form_functions.createData_complete(document.getElementsByTagName('form'),this.formData)
  
    let url = '/SIA/juridico/NotaGenericos/Save'

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

 
  render(){
    
    return (
      <div className="cedula-container row">
        <form onSubmit={this.HandleSubmit} className="col-lg-12">
          <Formulario cancel={this.HandleCancel} open={this.HandleOpenModal}  {...this.props}  />
            {
              this.state.modal &&
              <this.OpenModal />
            }
        </form>
      </div>
    )
  }
}
