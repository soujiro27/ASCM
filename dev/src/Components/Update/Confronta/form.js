import React,{Component} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './../form.styl'
import './../fechas.styl';


export default class Cedula extends Component {

  state = {
    inputNota:false
  }

  componentDidMount(){
      let input = document.getElementsByClassName('DayPickerInput');
      input[0].children[0].setAttribute('name','fecha_confronta')
      input[1].children[0].setAttribute('name','fecha_documento')
  }

  componentWillMount(){
    let nota = sessionStorage.getItem('nota')
    if(nota == 'SI'){
      this.setState({inputNota:true})
    }
  }


  render(){
    
    let datos = this.props.data
    let hora = datos.hConfronta.substr(0,5)
    return(
      <div className="form-container label-bold">
        <div className="row datos_oficio">
          <div className="col-lg-12">
            <h4>Datos Cedula</h4>  
          </div>
          <div className="col-lg-6">
            <label>Nombre de la Persona que acudira a la Confronta</label>
            <input type="text" name="nombre" required maxLength="120" placeholder="Nombre"  className="form-control" defaultValue={datos.nombreResponsable}/>
          </div>

          <div className="col-lg-6">
            <label>Cargo de la Persona que acudira a la Confronta</label>
            <input type="text" name="cargo" required maxLength="120" placeholder="Cargo"  className="form-control" defaultValue={datos.cargoResponsable}/>
          </div>

          <div className="col-lg-3">
            <label>Siglas</label>
            <input type="text" name="siglas" required maxLength="100" placeholder="Siglas"  className="form-control" defaultValue={datos.siglas}/>
          </div>

          <div className="col-lg-3">
            <label>Numero Documento</label>
            <input type="text" name="folio" required maxLength="50" placeholder="Numero Documento"  className="form-control" defaultValue={datos.numFolio}/>
          </div>
          <div className={this.state.inputNota ? 'col-lg-3': 'col-lg-3' }>
            <label>Referencia Documento</label>
            <input type="text" name="ref_documento" required maxLength="50" placeholder="Referencia Documento"  className="form-control" defaultValue={datos.refDocumento}/>
          </div>

          {
            this.state.inputNota &&
            <div className="col-lg-3">
              <label>Nota Informativa</label>
              <input type="text" name="notaInformativa" required maxLength="50" placeholder="Nota Informativa"  className="form-control" defaultValue={datos.notaInformativa}/>
            </div>
          }

          <div className="col-lg-3">
            <label>Fecha Confronta</label>
            <DayPickerInput value={datos.fConfronta}/>
          </div>
          <div className="col-lg-3">
            <label>Hora Confronta</label>
              <input type="time" className="form-control"  name="hora_confronta" required
                  patter="(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}" placeholder="HH:MM" defaultValue={hora} />
          </div>

          <div className="col-lg-3">
            <label>Fecha Documento</label>
            <DayPickerInput value={datos.fOficio}/>
          </div>
          
          <div className="col-lg-12">
            <label>Nombre Remitente</label>
            <input type="text" name="nombreRemitente" required maxLength="100" placeholder="Nombre"  className="form-control" defaultValue={datos.nombreRemitente}/>
          </div>

          <div className="col-lg-12">
            <label>Puesto Remitente</label>
            <input type="text" name="puestoRemitente" required maxLength="300" placeholder="Nombre"  className="form-control" defaultValue={datos.puestoRemitente}/>
          </div>

         


        </div>

        <div className="form-container label-bold">
          <div className="row datos_confronta">
            <div className="col-lg-12">
              <h4>Espacios Cedula</h4>  
            </div>
            <div className="col-lg-2">
              <label>Siglas</label>
              <input type="number" min='0' max='100' name="e_siglas" className="form-control" defaultValue={datos.sigla} id="e_siglas"/>
            </div>
            <div className="col-lg-2">
                <label>Previsualizar</label>
                <button className="btn btn-warning form-control" onClick={this.props.prev} >Cedula</button>
            </div>
          </div>
        </div>



        <div className="col-lg-12 submit-group">
            <input type="submit" value="Guardar" className="btn  btn-primary" />
            <button className="btn btn-danger " onClick={this.props.cancel}>Cancelar</button>
            <button className="btn btn-info btn-print" onClick={this.props.print}>Imprimir Cedula  <i className="fas fa-print"></i></button>
        </div>


      </div>
    )
  }

}
