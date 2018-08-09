import React,{Component} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './../form.styl'
import './fechas.styl';


export default class Cedula extends Component {

  componentDidMount(){
      let input = document.getElementsByClassName('DayPickerInput');
      input[0].children[0].setAttribute('name','fecha_documento')
  }

  render(){
    return(
      <div className="form-container">
        <div className="row">

          <div className="col-lg-3">
            <label>Siglas</label>
            <input type="text" name="siglas" required maxLength="150" placeholder="Siglas"  className="form-control"/>
          </div>

          <div className="col-lg-2">
            <label>Fecha Documento</label>
            <DayPickerInput />
          </div>

            <div className="col-lg-2">
              <label>Añadir Firmas</label>
              <button className="btn btn-success" onClick={this.props.OpenModalFirmas}>Agregar</button>
            </div>

            <div className="col-lg-3">
              <label>Texto Promocion de Acciones</label>
              <button className="btn btn-success" onClick={this.props.OpenModalTextos}>Agregar</button>
            </div>

        </div>

        <div className="row">
          <div className="col-lg-3">
            <label>Espacios Observaciones</label>
            <input type="number" min='0' max='100' name="e_observaciones" className="form-control" defaultValue="0"/>
          </div>

          <div className="col-lg-3">
            <label>Espacios Texto</label>
            <input type="number" min='0' max='100' name="e_texto" className="form-control" defaultValue="0"/>
          </div>

          <div className="col-lg-3">
            <label>Espacios Firmas</label>
            <input type="number" min='0' max='100' name="e_firmas" className="form-control" defaultValue="0"/>
          </div>

          <div className="col-lg-3">
            <label>Espacios Copias</label>
            <input type="number" min='0' max='100' name="e_copias" className="form-control" defaultValue="0"/>
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
