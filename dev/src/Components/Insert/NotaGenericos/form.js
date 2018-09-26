import React,{Component} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import 'react-day-picker/lib/style.css';
import './../form.styl'
import './../fechas.styl';
var FroalaEditor = require('react-froala-editor');

export default class FormularioInsert extends Component {

  
  upper = (event) =>{
    event.preventDefault();
    let id = event.target.getAttribute('data-name');
    let texto = document.getElementById(id).value;
    document.getElementById(id).value = texto.toUpperCase()
  }
  
  lower = (event) =>{
    event.preventDefault();
    let id = event.target.getAttribute('data-name');
    let texto = document.getElementById(id).value;
    document.getElementById(id).value = texto.toLowerCase();
  }


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
    let datos = this.props.data[0]
    let nombre
    let data = datos.nombre == undefined ? nombre = '': nombre=`${datos.saludo} ${datos.nombre}`;
    return(
      <div className="form-container label-bold">
        <div className="row datos_confronta">
          <div className="col-lg-12"><h4>Datos Cedula </h4></div>
          <div className="col-lg-3">
            <label>Numero De Folio</label>
            <input type="text" placeholder="Folio" required name="folio" maxLength="50" className="form-control" />
          </div>

          <div className="col-lg-3">
            <label>Siglas</label>
            <input type="text" placeholder="Siglas" required name="siglas" maxLength="50" className="form-control" />
          </div>

          <div className="col-lg-3">
            <label>Referencia Documento</label>
            <input type="text" placeholder="Referencia Documento" required name="refDocumento" maxLength="50" className="form-control" />
          </div>

          <div className="col-lg-3">
            <label>Fecha Documento</label>
            <DayPickerInput />
          </div>

          <div className="col-lg-12">
            <label>Nombre Remitente</label>
            <Tooltip
              placement="right" 
              overlay={
                <div className="btn-letters">
                  <p className="upper" onClick={this.upper} data-name="nombre">A</p>
                  <p className="lower" onClick={this.lower} data-name="nombre">a</p>
                </div>}
              >
              <input type="text" placeholder="Nombre Remitente" required name="nombre_remitente" maxLength="100" className="form-control"  id="nombre" defaultValue={nombre} />
            </Tooltip>
          </div>

           <div className="col-lg-12">
            <label>Puesto Remitente</label>
            <Tooltip
              placement="right" 
              overlay={
                <div className="btn-letters">
                  <p className="upper" onClick={this.upper} data-name="puesto">A</p>
                  <p className="lower" onClick={this.lower} data-name="puesto">a</p>
                </div>}
              >
              <input type="text" placeholder="Puesto Remitente" required name="puesto_remitente" maxLength="300" className="form-control"  id="puesto" defaultValue={datos.puesto}/>
            </Tooltip>
          </div>

          <div className="col-lg-12">
            <label>Institucion Remitente</label>
            <Tooltip
              placement="right" 
              overlay={
                <div className="btn-letters">
                  <p className="upper" onClick={this.upper} data-name="institucion">A</p>
                  <p className="lower" onClick={this.lower} data-name="institucion">a</p>
                </div>}
              >
              <input type="text" placeholder="Institucion Remitente"  name="institucion_remitente" maxLength="300" className="form-control" id="institucion" />
            </Tooltip>
          </div>

          <div className="col-lg-2">
            <label>Copias Internos</label>
            <button className="btn btn-primary" onClick={this.openModal} data-nombre="INTERNOS">Agregar</button>
          </div>

          <div className="col-lg-2">
            <label>Copias Externos</label>
            <button className="btn btn-primary" onClick={this.openModal} data-nombre="EXTERNOS">Agregar</button>
          </div>

          <div className="col-lg-2">
            <label>Persona Firma</label>
            <button className="btn btn-primary" onClick={this.openModal} data-nombre="FIRMAS">Agregar</button>
          </div>

          <div className="col-lg-12"> 
            <label>Texto Cedula</label>
            <FroalaEditor
              base='https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.3.4'
              fullscreenP={true}
              listsP={true}
              tableP={true}
              options={{placeholderText: 'Escriba aqui el Texto',}}
              />
          </div>


        </div>

        <div className="row datos_confronta">
        <div className="col-lg-12"><h4>Espacios Cedula </h4></div>
          <div className="col-lg-2">
            <label>Atte.</label>
            <input type="number"  required name="e_atte" min="0" max="99" defaultValue="0" className="form-control" id="atte" />
          </div>

          <div className="col-lg-2">
            <label>Copias</label>
            <input type="number"  required name="e_copias" min="0" max="99" defaultValue="0" className="form-control" id="copias"/>
          </div>

          <div className="col-lg-2">
            <label>Siglas</label>
            <input type="number"  required name="e_siglas" min="0" max="99" defaultValue="0" className="form-control" id="siglas"/>
          </div>

          <div className="col-lg-2">
            <label>Ancho Puesto</label>
            <input type="number"  required name="anchoPuesto" min="1" max="99" defaultValue="1" className="form-control" id="anchoPuesto"/>
          </div>

          <div className="col-lg-2">
            <label>Previsualizar</label>
            <button className="bnt btn-warning form-control" onClick={this.openModal} data-nombre="PREVIEW">Cedula</button>
          </div>

        </div>

       
        <div className="col-lg-4 submit-group">
            <input type="submit" value="Guardar" className="btn btn-sm btn-primary" />
            <button className="btn btn-danger btn-sm" onClick={this.props.cancel}>Cancelar</button>

        </div>


      </div>
    )
  }


}
