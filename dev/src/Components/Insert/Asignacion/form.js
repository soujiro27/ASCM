import React,{Component} from 'react';
import axios from 'axios';
import './../form.styl'

export default  class formAsignacion extends Component {

  state = {
    empleados:[]
  }




  render(){
    return(
      <div className="form-container">
        <div className="row">

          <div className="col-lg-4">
            <label>Enviar A:</label>
            <select name="empleado" required className="form-control">
              <option value="">Escoja Opcion</option>
            </select>
          </div>

          <div className="col-lg-3">
            <label>Prioridad</label>
            <select name="prioridad" required className="form-control">
              <option value="">Escoja Opcion</option>
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
            <textArea rows="5" className="form-control"></textArea>
          </div>
        </div>

        <div className="col-lg-4 submit-group">
            <input type="submit" value="Guardar" className="btn btn-sm btn-primary" />
            <button className="btn btn-danger btn-sm" >Cancelar</button>
        </div>



      </div>
    )
  }
}
