import React,{Component} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './../form.styl'
import './../fechas.styl';
var FroalaEditor = require('react-froala-editor');

export default class FormularioInsert extends Component {


  componentDidMount(){
      let input = document.getElementsByClassName('DayPickerInput');
      input[0].children[0].setAttribute('name','fecha_documento')
  }

  openModal = (event) =>{
    event.preventDefault();
    let modal = event.target.getAttribute('data-nombre');
    this.props.open(modal);
  }

  render(){
   let datos = this.props.data
    return(
      <div className="form-container label-bold">
        <div className="row datos_confronta">
        <div className="col-lg-12">
          <h4>Datos Cedula</h4>
        </div>
          <div className="col-lg-3">
            <label>Numero De Folio</label>
            <input type="text" placeholder="Folio" required name="folio" maxLength="50" className="form-control" defaultValue={datos.numFolio}/>
          </div>

          <div className="col-lg-3">
            <label>Siglas</label>
            <input type="text" placeholder="Siglas" required name="siglas" maxLength="50" className="form-control" defaultValue={datos.siglas} />
          </div>

          <div className="col-lg-2">
            <label>Fecha Documento</label>
            <DayPickerInput value={datos.fOficio}/>
          </div>

          <div className="col-lg-2">
            <label>Copias Internos</label>
            <button className="btn btn-primary" onClick={this.openModal} data-nombre="INTERNOS">Agregar</button>
          </div>

          <div className="col-lg-2">
            <label>Copias Externos</label>
            <button className="btn btn-primary" onClick={this.openModal} data-nombre="EXTERNOS">Agregar</button>
          </div>

           <div className="col-lg-4">
            <label>Nombre Remitente</label>
            <input type="text" placeholder="Nombre Remitente" required name="nombre_remitente" maxLength="100" className="form-control" defaultValue={datos.nombreRemitente}/>
          </div>

          <div className="col-lg-8">
            <label>Puesto Remitente</label>
            <input type="text" placeholder="Puesto Remitente" required name="puesto_remitente" maxLength="300" className="form-control" defaultValue={datos.puestoRemitente}/>
          </div>

          {
            datos.tipoRemitente == 'E' &&
            <div className="col-lg-12">
            <label>Institucion Remitente</label>
            <input type="text" placeholder="Intitucion Remitente" required name="institucion_remitente" maxLength="300" className="form-control" defaultValue={datos.institucionRemitente} />
          </div>
          }


          <div className="col-lg-12">
            <label>Asunto</label>
            <textarea name="asunto" name="asunto" maxLength="200" className="form-control" rows="3" defaultValue={datos.asunto}></textarea>
          </div>

          <div className="col-lg-12">
            <label>Texto Cedula</label>
            <FroalaEditor
              base='https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.3.4'
              fullscreenP={true}
              listsP={true}
              tableP={true}
              value={datos.texto}
              options={{placeholderText: 'Escriba aqui el Texto',}}
              />
          </div>


        </div>

        <div className="row">
          <div className="col-lg-2">
            <label>Espacios Atte.</label>
            <input type="number"  required name="e_atte" min="0" max="99" defaultValue="0" className="form-control" defaultValue={datos.atte} />
          </div>

          <div className="col-lg-2">
            <label>Espacios Copias</label>
            <input type="number"  required name="e_copias" min="0" max="99" defaultValue="0" className="form-control" defaultValue={datos.copia} />
          </div>

          <div className="col-lg-2">
            <label>Espacios Siglas</label>
            <input type="number"  required name="e_siglas" min="0" max="99" defaultValue="0" className="form-control" defaultValue={datos.sigla}/>
          </div>

        </div>

  

        <div className="col-lg-12 submit-group">
            <input type="submit" value="Guardar" className="btn  btn-primary" />
            <button className="btn btn-danger " onClick={this.props.cancel}>Cancelar</button>
            <button className="btn btn-warning btn-print" onClick={this.props.PrintCedula} >Imprimir Cedula</button>
        </div>


      </div>
    )
  }


}
