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
    if(this.props.nota == 'SI'){
      this.setState({inputNota:true})
    }
  }



  render(){
    return(
      <div className="form-container">
        <div className="row">

          <div className="col-lg-4">
            <label>Nombre</label>
            <input type="text" name="nombre" required maxLength="120" placeholder="Nombre"  className="form-control" defaultValue={this.props.data.nombreResponsable} />
          </div>

          <div className="col-lg-4">
            <label>Cargo</label>
            <input type="text" name="cargo" required maxLength="120" placeholder="Cargo"  className="form-control" defaultValue={this.props.data.cargoResponsable} />
          </div>
          {
            this.state.inputNota &&
            <div className="col-lg-4">
              <label>Nota Informativa</label>
              <input type="text" name="notaInformativa" required maxLength="50" placeholder="Nota Informativa"  className="form-control" defaultValue={this.props.data.notaInformativa}/>
            </div>
          }

        </div>

        <div className="row">

          <div className="col-lg-4">
            <label>Siglas</label>
            <input type="text" name="siglas" required maxLength="100" placeholder="Siglas"  className="form-control" defaultValue={this.props.data.siglas} />
          </div>

          <div className="col-lg-4">
            <label>Numero Documento</label>
            <input type="text" name="folio" required maxLength="50" placeholder="Numero Documento"  className="form-control" defaultValue={this.props.data.numFolio} />
          </div>

          <div className="col-lg-4">
            <label>Referencia Documento</label>
            <input type="text" name="ref_documento" required maxLength="50" placeholder="Referencia Documento"  className="form-control" defaultValue={this.props.data.refDocumento}/>
          </div>

        </div>

        <div className="row">
          <div className="col-lg-2">
            <label>Fecha Confronta</label>
            <DayPickerInput />
          </div>
          <div className="col-lg-2">
            <label>Hora Confronta</label>
              <input type="time" className="form-control"  name="hora_confronta" required
                  patter="(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}" placeholder="HH:MM" />
          </div>

          <div className="col-lg-2">
            <label>Fecha Documento</label>
            <DayPickerInput />
          </div>

          <div className="col-lg-2">
            <label>Espacios Siglas</label>
            <input type="number" min='0' max='100' name="e_siglas" className="form-control" defaultValue={this.props.data.sigla}/>
          </div>


        </div>


        <div className="col-lg-4 submit-group">
            <input type="submit" value="Guardar" className="btn btn-sm btn-primary" />
            <button className="btn btn-danger btn-sm" onClick={this.props.cancel}>Cancelar</button>
            <button className="btn btn-warning btn-sm" onClick={this.props.PrintCedula}>Cedula</button>

        </div>


      </div>
    )
  }


}
