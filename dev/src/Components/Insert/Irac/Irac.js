import React,{Component} from 'react';
import axios from 'axios';
import Formulario from './form.js';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';

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
    location.href = '/SIA/juridico/Irac'
  }

  closeModalFirmas = (firmas) => {
    if(firmas.length > 0 ) this.formData['firmas'] = firmas;
    this.setState({modal:false});
  }

  HandleCloseModal = () =>{
    if(this.state.response){
      window.open('/SIA/jur/App/cedulas/OFICIO_IRAC.php?param='+this.props.idVolante);
      window.open('/SIA/jur/App/cedulas/CEDULA_IRAC.php?param='+this.props.idVolante);
      location.href = '/SIA/juridico/Irac';
    } else {
      this.setState({modal:false})
    }
  }

  prevOficio = (event) => {
    event.preventDefault();
    let atte = document.getElementById('atte').value;
    let copias = document.getElementById('e_copias').value;
    let siglas = document.getElementById('siglas').value;
    if(atte != '' && copias != '' && siglas != '' ){
      document.getElementById('prev-cedula').innerHTML = (`<iframe src="/SIA/jur/App/cedulas/preview/oficio_irac_preview.php?atte=${atte}&copias=${copias}&siglas=${siglas}"></iframe>`)
    }
  }

  prevObvs = (event) => {
    event.preventDefault();
    let obvs = document.getElementById('obvs').value;
    let texto = document.getElementById('texto').value;
    let firmas = document.getElementById('firmas').value;
    let copias = document.getElementById('copias').value;
    let fecha = document.getElementById('fecha').value;
    if( obvs != '' && texto != '' && firmas != '' && copias != ''){
      document.getElementById('prev-cedula').innerHTML = (`<iframe src="/SIA/jur/App/cedulas/preview/irac_preview.php?obvs=${obvs}&copias=${copias}&texto=${texto}&firmas=${firmas}&fecha=${fecha}&param=${this.props.idVolante}"></iframe>`)
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
        <form onSubmit={this.HandleSubmit} className="col-lg-7">
          <Formulario cancel={this.HandleCancel} open={this.HandleOpenModal} prevOficio={this.prevOficio} data={this.props.data[0]} prevObvs={this.prevObvs}/>
            {
              this.state.modal &&
              <this.OpenModal />
            }
        </form>
        <div className="col-lg-5 prev-cedula" id="prev-cedula">
          <h2><i className="fas fa-file-pdf"></i></h2>
          <h4>Inserte los datos y presione el boton de Previsualizar para ver una vista previa de la cedula</h4>
        </div>
      </div>
    )
  }
}
