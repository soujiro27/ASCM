import React,{Component} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './../form.styl'
import './../fechas.styl';
var FroalaEditor = require('react-froala-editor');

export default class FormularioInsert extends Component {

  state = {
    value:'<p>Pruebas</p>'
  }


  componentDidMount(){
      let input = document.getElementsByClassName('DayPickerInput');
      input[0].children[0].setAttribute('name','fecha_documento')
  }


  pruebasHtml = () => {
    let div = document.getElementsByClassName('fr-element')
    let html = div[0].innerHTML

  }

  render(){
    return(
      <div className="form-container">
        <div className="row">
          <div className="col-lg-3">
            <label>Numero De Folio</label>
            <input type="text" placeholder="Folio" required name="folio" maxLength="50" className="form-control" />
          </div>

          <div className="col-lg-3">
            <label>Siglas</label>
            <input type="text" placeholder="Siglas" required name="siglas" maxLength="50" className="form-control" />
          </div>

          <div className="col-lg-3">
            <label>Fecha Documento</label>
            <DayPickerInput />
          </div>



        </div>

        <div className="row">
          <div className="col-lg-12">
            <label>Asunto</label>
            <textarea name="asunto" name="asunto" maxLength="200" className="form-control" rows="3"></textarea>
          </div>
        </div>

        <div className="row">

          <div className="col-lg-2">
            <label>Copias Internos</label>
            <button className="btn btn-primary" onClick={this.props.OpenModalInternos}>Agregar</button>
          </div>

          <div className="col-lg-2">
            <label>Copias Externos</label>
            <button className="btn btn-primary" onClick={this.props.OpenModalExternos}>Agregar</button>
          </div>

        </div>

        <div className="row">
          <div className="col-lg-2">
            <label>Espacios Atte.</label>
            <input type="number"  required name="e_atte" min="0" max="99" defaultValue="0" className="form-control" />
          </div>

          <div className="col-lg-2">
            <label>Espacios Copias</label>
            <input type="number"  required name="e_copias" min="0" max="99" defaultValue="0" className="form-control" />
          </div>

          <div className="col-lg-2">
            <label>Espacios Siglas</label>
            <input type="number"  required name="e_siglas" min="0" max="99" defaultValue="0" className="form-control" />
          </div>

        </div>

        <div className="row">
          <div className="col-lg-12">

            <FroalaEditor
              base='https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.3.4'
              value={this.state.value}
              tableP={true}
              />
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
