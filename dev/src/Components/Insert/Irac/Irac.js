import React,{Component} from 'react';
import axios from 'axios';
import Formulario from './form.js';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';
import OficioPreview from './../../Modals/OficioIracPreview';
import ObservacionesPreview from './../../Modals/ObservacionesIracPreview';

import ModalFirmas from './../../Modals/FirmasCedula'

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
    idVolante:this.props.idVolante
  }

  OpenModal = () =>{
    if(this.state.nombre === 'FIRMAS'){ return <ModalFirmas visible={true} close={this.closeModalBolean} closeModalFirmas={this.closeModalFirmas}/>}
    else if (this.state.nombre === 'OFICIO') { return <OficioPreview  close={this.closeModalBolean}/>}
    else if (this.state.nombre === 'OBSERVACIONES') { return <ObservacionesPreview idVolante={this.props.idVolante} close={this.closeModalBolean} firmas={this.formData['firmas']}/>}
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
    location.href = '/SIA/juridico/'+ this.props.modulo
  }

  closeModalFirmas = (firmas) => {
    if(firmas.length > 0 ) this.formData['firmas'] = firmas;
    this.setState({modal:false});
  }

  HandleCloseModal = () =>{
    if(this.state.response){
      window.open('/SIA/jur/App/cedulas/OFICIO_IRAC.php?param='+this.props.idVolante);
      window.open('/SIA/jur/App/cedulas/CEDULA_IRAC.php?param='+this.props.idVolante);
      location.href = '/SIA/juridico/'+this.props.modulo;
    } else {
      this.setState({modal:false})
    }
  }

  HandleSubmit = (event) => {
    event.preventDefault();

    let form_functions = new submit()
    let data = form_functions.createData_complete(document.getElementsByTagName('form'),this.formData)
    let url = '/SIA/juridico/Irac/Save'

    axios.post(url,data)
    .then(response =>{
      let respuesta = form_functions.resolve_request(response);
      this.setState(respuesta);
    })

  }

  render(){
    return (
      <div className="cedula-container row">
        <form onSubmit={this.HandleSubmit} className="col-lg-12">
          <Formulario cancel={this.HandleCancel} open={this.HandleOpenModal}  data={this.props.data[0]} />
            {
              this.state.modal &&
              <this.OpenModal />
            }
        </form>
      </div>
    )
  }
}
