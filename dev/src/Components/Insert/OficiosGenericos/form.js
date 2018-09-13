import React,{Component} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import FroalaEditor from 'react-froala-editor'
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import './../form.styl'
import './../fechas.styl';

export default class FormularioInsert extends Component {

  componentDidMount(){
      let input = document.getElementsByClassName('DayPickerInput');
      input[0].children[0].setAttribute('name','fecha_documento');
  }

  openModal = (event) =>{
    event.preventDefault();
    let modal =event.target.getAttribute('data-nombre');
    this.props.open(modal);
  }

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

          <div className="col-lg-2">
            <label>Fecha Documento</label>
            <DayPickerInput />
          </div>

           <div className="col-lg-2">
              <label>Copias Internos</label>
              <button className="btn btn-primary form-control" onClick={this.openModal} data-nombre="INTERNOS">Agregar</button>
            </div>

            <div className="col-lg-2">
              <label>Copias Externos</label>
              <button className="btn btn-primary form-control" data-nombre="EXTERNOS" onClick={this.openModal}>Agregar</button>
            </div>

          <div className="col-lg-11">
            <label>Nombre Remitente</label>
            <Tooltip
              placement="right" 
              overlay={
                <div className="btn-letters">
                  <p className="upper" onClick={this.upper} data-name="nombre">A</p>
                  <p className="lower" onClick={this.lower} data-name="nombre">a</p>
                </div>}
              >
              <input type="text" placeholder="Nombre Remitente" required name="nombre_remitente" maxLength="100" className="form-control" defaultValue={nombre} id="nombre" />
            </Tooltip>
          </div>

           <div className="col-lg-11">
            <label>Puesto Remitente</label>
            <Tooltip
              placement="right" 
              overlay={
                <div className="btn-letters">
                  <p className="upper" onClick={this.upper} data-name="puesto">A</p>
                  <p className="lower" onClick={this.lower} data-name="puesto">a</p>
                </div>}
              >
              <input type="text" placeholder="Puesto Remitente" required name="puesto_remitente" maxLength="300" className="form-control" defaultValue={datos.puesto} id="puesto" />
            </Tooltip>
          </div>

          <div className="col-lg-11">
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
     
          <div className="col-lg-12" >
            <label>Asunto</label>
            <textarea rows="4" className="form-control" name="asunto"></textarea>
          </div>

          <div className="col-lg-12">
            <label>Texto Cedula</label>
            <FroalaEditor
                  base='https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.3.4'
                  fullscreenP={true}
                  listsP={true}
                  alignP={true}
                  charCounterP={true}
                  fontSizeP={true}
                  tableP={true}           
                  fontFamilyP={true}
                  options={{placeholderText: 'Escriba aqui la Texto Cedula',}}
                  />
          </div>

           

        </div>

        <div className="row">
        <div className="col-lg-12"><h4>Espacios Cedula </h4></div>
          <div className="col-lg-4">
            <label>Atentamente</label>
            <input type="number"  required name="e_atte" min="0" max="99" defaultValue="0" className="form-control"  id="atte"/>
          </div>

          <div className="col-lg-4">
            <label>Copias</label>
            <input type="number"  required name="e_copias" min="0" max="99" defaultValue="0" className="form-control" id="copias" />
          </div>

          <div className="col-lg-4">
            <label>Siglas</label>
            <input type="number"  required name="e_siglas" min="0" max="99" defaultValue="0" className="form-control" id="siglas" />
          </div>
          
        </div>

        

        <div className="col-lg-4 submit-group">
            <input type="submit" value="Guardar" className="btn  btn-primary" />
            <button className="btn btn-danger " onClick={this.props.cancel}>Cancelar</button>

        </div>


      </div>
    )
  }


}
