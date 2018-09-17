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

  HandleClickModal = (event) =>{
    event.preventDefault();
    let modal = event.target.getAttribute('data-modal')
    this.props.open(modal);
  }

  render(){
    let datos = this.props.data
    let nombre = `${datos.saludo} ${datos.nombre} ${datos.paterno} ${datos.materno}`
    return(
      <div className="form-container label-bold">
        <div className="row datos_confronta">
          <div className="col-lg-12"><h4>Datos Cedula </h4></div>
          <div className="col-lg-3">
            <label>Siglas</label>
            <input type="text" name="siglas" required maxLength="150" placeholder="Siglas"  className="form-control" defaultValue={datos.siglas}/>
          </div>

          <div className="col-lg-3">
            <label>Folio</label>
            <input type="text" name="folio" required maxLength="50" placeholder="Folio"  className="form-control" defaultValue={datos.numFolio}/>
          </div>

          <div className="col-lg-3">
            <label>Fecha Documento</label>
            <DayPickerInput  value={datos.fOficio}/>
          </div>

           <div className="col-lg-2">
            <label>Firmas Cedula</label>
            <button className="btn btn-success form-control" onClick={this.HandleClickModal} data-modal="FIRMAS">Añadir Firmas  <i className="fas fa-plus-circle"></i></button>
          </div>

          <div className="col-lg-12">
            <label>Nombre Remitente</label>
            <input type="text" name="nombre_remitente" required maxLength="100"  defaultValue={datos.nombreRemitente} className="form-control" />
          </div>

          <div className="col-lg-12">
            <label>Area Remitente</label>
            <input type="text" name="puesto_remitente" required maxLength="100" defaultValue={datos.puestoRemitente}  className="form-control"/>
          </div>

         
        </div>


        <div className="row espacios_oficio">
          <div className="col-lg-12"><h4>Espacios Cedula Oficio</h4></div>

            <div className="col-lg-3">
              <label>Atentamente</label>
              <input type="number" min='0' max='100' name="e_atte" className="form-control" defaultValue={datos.atte} id="atte"/>
            </div>

            <div className="col-lg-2">
              <label>Copias</label>
              <input type="number" min='0' max='100' name="e_copias_oficio" className="form-control" defaultValue={datos.copia} id="e_copias"/>
            </div>

            <div className="col-lg-2">
              <label>Siglas</label>
              <input type="number" min='0' max='100' name="e_siglas" className="form-control" defaultValue={datos.sigla} id="siglas" />
            </div>
            <div className="col-lg-2">
                <label>Previsualizar</label>
              <button className="btn btn-warning form-control" onClick={this.HandleClickModal} data-modal="OFICIO">Oficio</button>
            </div>

        </div>

        <div className="row espacios_observaciones">
          <div className="col-lg-12"><h4>Espacios Cedula Observaciones</h4></div>
          <div className="col-lg-2">
            <label>Observaciones</label>
            <input type="number" min='0' max='100' name="e_observaciones" className="form-control" defaultValue={datos.encabezado} id="obvs"/>
          </div>

          <div className="col-lg-2">
            <label>Texto</label>
            <input type="number" min='0' max='100' name="e_texto" className="form-control" defaultValue={datos.cuerpo} id="texto"/>
          </div>

          <div className="col-lg-2">
            <label>fecha</label>
            <input type="number" min='0' max='100' name="e_fecha" className="form-control" defaultValue={datos.fechaDocto} id="fecha"/>
          </div>


          <div className="col-lg-2">
            <label>Firmas</label>
            <input type="number" min='0' max='100' name="e_firmas" className="form-control" defaultValue={datos.pie} id="firmas"/>
          </div>

          <div className="col-lg-2">
            <label>Copias</label>
            <input type="number" min='0' max='100' name="e_copias" className="form-control" defaultValue={datos.copiaCedula} id="copias"/>
          </div>


          <div className="col-lg-2 ">
          <label>Previsualizar</label>
              <button className="btn btn-warning form-control" onClick={this.HandleClickModal} data-modal="OBSERVACIONES">Observaciones</button>
          </div>

        </div>


        <div className="col-lg-12 submit-group">
            <input type="submit" value="Guardar" className="btn btn-primary" />
            <button className="btn btn-danger " onClick={this.props.cancel}>Cancelar</button>
            <button className="btn btn-info btn-print" onClick={this.props.PrintCedula}>Imprimir Cedula  <i className="fas fa-print"></i></button>
        </div>



      </div>
    )
  }


}
