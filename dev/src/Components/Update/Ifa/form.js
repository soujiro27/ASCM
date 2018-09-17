import React,{Component} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './../form.styl'
import './../fechas.styl';


export default class Cedula extends Component {

  componentDidMount(){
      let input = document.getElementsByClassName('DayPickerInput');
      input[0].children[0].setAttribute('name','fecha_documento')
  }

  openModal = (event) => {
    event.preventDefault();
    let modal = event.target.getAttribute('data-name');
    this.props.open(modal)
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
            <label>Siglas</label>
            <input type="text" name="siglas" required maxLength="150" placeholder="Siglas"  className="form-control" defaultValue={datos.siglas} />
          </div>

          <div className="col-lg-3">
            <label>Fecha Documento</label>
            <DayPickerInput value={datos.fOficio}/>
          </div>

            <div className="col-lg-3">
              <label>Añadir Firmas</label>
              <button className="btn btn-success form-control" onClick={this.openModal} data-name="FIRMAS">Agregar  <i className="fas fa-plus-circle" ></i></button>
            </div>

            <div className="col-lg-3">
              <label>Texto Promocion de Acciones</label>
              <button className="btn btn-success form-control" onClick={this.openModal} data-name="TEXTOS">Agregar  <i className="fas fa-plus-circle"></i></button>
            </div>

        </div>

        <div className="row datos_confronta">
        <div className="col-lg-12">
            <h4>Espacios Cedula</h4>
          </div>
          <div className="col-lg-2">
            <label>Observaciones</label>
            <input type="number" min='0' max='100' name="e_observaciones" className="form-control" defaultValue={datos.encabezado} id="obvs"/>
          </div>

          <div className="col-lg-2">
            <label>Texto</label>
            <input type="number" min='0' max='100' name="e_texto" className="form-control" defaultValue={datos.cuerpo} id="texto" />
          </div>

            <div className="col-lg-2">
            <label>Fecha</label>
            <input type="number" min='0' max='100' name="e_fecha" className="form-control" defaultValue={datos.fechaDocto} id="fecha" />
          </div>

          <div className="col-lg-2">
            <label>Firmas</label>
            <input type="number" min='0' max='100' name="e_firmas" className="form-control" defaultValue={datos.pie} id="firmas"/>
          </div>

          <div className="col-lg-2">
            <label>Copias</label>
            <input type="number" min='0' max='100' name="e_copias" className="form-control" defaultValue={datos.copiaCedula} id="copias"/>
          </div>

           <div className="col-lg-2">
            <label>Previsualizar</label>
            <button className="btn btn-warning" onClick={this.openModal} data-name="PREVIEW">Cedula</button>
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
