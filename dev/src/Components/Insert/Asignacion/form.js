import React,{Component} from 'react';
import axios from 'axios';
import './../form.styl'

export default  class formAsignacion extends Component {

  state = {
    empleados:[],
    caracteres:[]
  }

  getPuestos = () =>{
    return axios.get('/SIA/juridico/Api/Puestos/Asignacion')
  }

  getCaracteres = () => {
    return axios.get('/SIA/juridico/Api/Caracteres')
  }

  componentDidMount(){

    axios.all([this.getPuestos(),this.getCaracteres()])
    .then(axios.spread((puestos,caracteres) => {
        this.setState({
          empleados:puestos.data,
          caracteres:caracteres.data
        })
    }));
  }


  render(){
    //console.log(this.state)
    return(
      <div className="form-container">
        <div className="row">

          <div className="col-lg-5">
            <label>Enviar A:</label>
            <select name="empleado" required className="form-control">
              <option value="">Escoja Opcion</option>
              {
                this.state.empleados.map(item => (
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
                this.state.caracteres.map(item => (
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
