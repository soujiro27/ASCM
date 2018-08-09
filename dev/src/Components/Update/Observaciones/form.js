import React,{Component} from 'react';
import axios from 'axios';
import './../form.styl'
import ReactQuill from 'react-quill'

// import stylesheet
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import './../../shared_styles/text-editor.styl'

export default  class formAsignacion extends Component {


  state = {
      text:this.props.data.observacion
  }


  options = {
      theme: 'snow'
  }

  HandleTextEditor = (html) =>{
      this.setState({text:html})
  }

  render(){
    return(
      <div className="form-container">
        <div className="row">

          <div className="col-lg-3">
            <label>Hoja</label>
            <input type="number" required name="hoja" placeholder="Numero de Hoja" className="form-control" min="1" max="999" defaultValue={this.props.data.pagina} />
          </div>


          <div className="col-lg-3">
            <label>Parrafo</label>
            <input type="number" required name="parrafo" placeholder="Numero de Parrafo" className="form-control" min="1" max="999" defaultValue={this.props.data.parrafo} />
          </div>

          </div>
          <div className="row">
          <div className="col-lg-12">
              <label>Observacion</label>
              <ReactQuill options={this.options} onChange={this.HandleTextEditor} value={this.state.text} />
              <input type="hidden" name="texto" value={this.state.text} />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-lg-3">
              <label>Estatus</label>
              <select defaultValue={this.props.data.estatus} className="form-control" name="estatus" required>
                  <option value="ACTIVO">ACTIVO</option>
                  <option value="INACTIVO">INACTIVO</option>
              </select>
          </div>
        </div>

        <div className="row">
        <div className="col-lg-4 submit-group-observaciones">
            <input type="submit" value="Guardar" className="btn btn-sm btn-primary" />
            <button className="btn btn-danger btn-sm" onClick={this.props.cancel} >Cancelar</button>
        </div>
        </div>
      </div>
    )
  }
}
