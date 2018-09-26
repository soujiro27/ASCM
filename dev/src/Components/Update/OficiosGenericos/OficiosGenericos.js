import React,{Component} from 'react';
import axios from 'axios';
import Formulario from './form.js';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';
import ModalInternos from './../../Modals/CopiasInternos';
import Preview from './../../Modals/OficioGenericoPreview';

import './../../shared_styles/insert.styl'
import submit from './../../functions/submit';

export default class Update extends Component {

  state = {
    modal:false,
    nombre:'',
    message:'',
    response:false,
  }


  formData = {
    Internos:'',
    Externos:'',
    texto:this.props.data[0].texto,
    copias:this.props.data[0].copias,
    idVolante:this.props.data[0].idVolante,

  }
  
  OpenModal = () =>{
    if(this.state.nombre === 'INTERNOS'){ return <ModalInternos  firmas={this.props.data[0].copias} tipo='I' close={this.closeModalRemitente} closeModalCopias={this.closeModalCopias} />}
    else if(this.state.nombre === 'EXTERNOS'){ return <ModalInternos firmas={this.props.data[0].copias}  tipo='E' close={this.closeModalRemitente} closeModalCopias={this.closeModalCopias} />}
    else if (this.state.nombre === 'ERROR') { return <ErrorForm visible={true} message={this.state.message} close={this.HandleCloseModal}/>}
    else if (this.state.nombre === 'SUCCESS') { return <SuccessForm visible={true}  close={this.HandleCloseModal}/>}
    else if (this.state.nombre === 'PREVIEW') { return <Preview  close={this.closeModalRemitente}/>}
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

  PrintCedula = (event) =>{
    event.preventDefault();
    window.open(`/SIA/jur/App/Cedulas/OFICIO_GENERICO.php?param=${this.props.data[0].idVolante}`);

  }

  HandleSubmit = (event) => {
    event.preventDefault();
    let form_functions = new submit()
    if(this.formData['Internos'] != '' || this.formData['Externos'] != '')this.formData['copias'] = this.formData['Internos'] + this.formData['Externos'];
    let div = document.getElementsByClassName('fr-element');
    let html = div[0].innerHTML;
    this.formData['texto'] = html;
    let data = form_functions.createDataUpdateFormData(document.getElementsByTagName('form'),'idPlantillaJuridico',this.props.data[0].idPlantillaJuridico,this.formData)
    axios.post('/SIA/juridico/DocumentosDiversos/Oficio/Update',data)
    .then(response =>{
      let respuesta = form_functions.resolve_request(response);
      this.setState(respuesta);
    })
  }

  HandleCancel = (event) => {
    event.preventDefault()
    location.href = '/SIA/juridico/DocumentosDiversos'
  }

  HandleCloseModal = () =>{
    if(this.state.response) {
      window.open(`/SIA/jur/App/Cedulas/OFICIO_GENERICO.php?param=${this.props.data[0].idVolante}`);
    } 

    this.setState({modal:false})
  }

  render(){
    return (<div className="cedula-container row">
      <form onSubmit={this.HandleSubmit} className="col-lg-12">
        <Formulario
          data={this.props.data[0]}
          cancel={this.HandleCancel}
          PrintCedula={this.PrintCedula}
          open={this.HandleOpenModal}
        />
        {
          this.state.modal &&
          <this.OpenModal />
        }
      </form>
    </div>
    )
  }

  
}
