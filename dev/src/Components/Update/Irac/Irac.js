import React,{Component} from 'react';
import axios from 'axios';
import submit from './../../functions/submit';
import Formulario from './form.js';
import ModalFirmas from './../../Modals/FirmasCedula'

import './../../shared_styles/insert.styl'

export default class Asignacion extends Component {

  HandleCancel = (event) => {
    event.preventDefault()
    location.href = '/SIA/juridico/Irac'
  }




  PrintCedula = (event) =>{
      event.preventDefault()
      window.open('/SIA/jur/App/cedulas/irac_.php?param='+this.props.data[0].idVolante);
      window.open('/SIA/jur/App/cedulas/oficio_irac.php?param='+this.props.data[0].idVolante);

  }

  render(){
    return (<div className="cedula-container row">
      <form onSubmit={this.HandleSubmit} className="col-lg-7">
        <Formulario
          data={this.props.data[0]}
          cancel={this.HandleCancel}
          PrintCedula={this.PrintCedula}
          />
      </form>
      <div className="col-lg-5 prev-cedula" id="prev-cedula">
        <h2><i className="fas fa-file-pdf"></i></h2>
        <h4>Inserte los datos y presione el boton de Previsualizar para ver una vista previa de la cedula</h4>
      </div>
    </div>
    )
  }
}
