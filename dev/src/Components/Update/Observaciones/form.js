import React,{Component} from 'react';
import axios from 'axios';
import './../form.styl'
import FroalaEditor from 'react-froala-editor'

export default  class formAsignacion extends Component {


  state = {
      text:this.props.data.observacion
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
                <FroalaEditor
                  base='https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.3.4'
                  fullscreenP={true}
                  listsP={true}
                  value={this.state.text}
                  options={{placeholderText: 'Escriba aqui la Observacion',}}
                  />
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
