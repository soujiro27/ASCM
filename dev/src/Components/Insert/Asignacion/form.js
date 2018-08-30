import React,{Component} from 'react';
import './../form.styl'

export default  class formAsignacion extends Component {


  render(){
    return(
      <div className="form-container">
        <div className="row">

          <div className="col-lg-5">
            <label>Enviar A:</label>
            <select name="empleado" required className="form-control">
              <option value="">Escoja Opcion</option>
              {
                this.props.puesto.map(item => (
                  <option key={item.idPuestoJuridico} value={item.idPuestoJuridico}>
                    {item.saludo} {item.nombre} {item.paterno} {item.materno}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="col-lg-2">
            <label>Prioridad</label>
            <select name="prioridad" required className="form-control">
              <option value="">Escoja Opcion</option>
              {
                this.props.caracteres.map(item => (
                  <option key={item.idCaracter} value={item.idCaracter}>{item.nombre}</option>
                ))
              }
            </select>
          </div>

          <div className="col-lg-5">
            <label>Anexar Archivo</label>
            <input type="file" name="file" id="file" className="form-control" />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <label>Asunto</label>
            <textarea rows="5" className="form-control" maxLength="350" name="asunto"></textarea>
          </div>
        </div>

        <div className="col-lg-4 submit-group">
            <input type="submit" value="Guardar" className="btn btn-sm btn-primary" />
            <button className="btn btn-danger btn-sm" onClick={this.props.cancel} >Cancelar</button>
        </div>

      </div>
    )
  }
}
