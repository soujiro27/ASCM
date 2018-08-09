import React,{Component} from 'react';
import axios from 'axios'
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './table.styl'

export default class Respuestas extends Component {

  state = {
    empleados:[],
    data : []
  }

  columns = [
      {
          Header:'Estado',
          accessor: props => {
             if(props.usrActual == props.idUsrReceptor){
               return(<p className="enviado">Recibido <i className="fas fa-arrow-alt-circle-left"></i></p>)
             } else {
               return(<p className="recibido">Enviado <i className="fas fa-arrow-alt-circle-right"></i></p>)
             }
          },
          id:'idEstado',
          width:100
      },
      {
          Header:'Fecha',
          accessor:props => {
            return(<p>{props.fAlta.substring(0,10)}</p>)
          },
          width:150,
          id:'idFecha'
      },
      {
          Header:'Hora',
          accessor: props => {
            return(<p>{props.fAlta.substring(11,16)}</p>)
          },
          width:150,
          id:'idHora'
      },
      {
          Header:'Comentario',
          accessor:'comentario'
      },
      {
          Header:'Archivo',
          accessor:props =>{
            if(props.archivoFinal == null){
              return (<p>Sin Archivo</p>)
            } else {
              return(<p><a href={`/SIA/jur/files/${props.idVolante}/Internos/${props.archivoFinal}`} target='_blank'>{props.archivoFinal}</a></p>)
            }
          },
          id:'idArchivo',
          width:150
      }
  ]

  componentDidMount(){

    axios.get('/SIA/juridico/Api/Puestos/Asignacion')
    .then(response =>  {
      let empleados = response.data
      this.setState({empleados})
    })
  }


  HandleChangeSelect = (event) => {
    let value = event.target.value
    if(value != '')
    {
        let url = '/SIA/juridico/Api/Respuestas'
        axios.get(url,{
          params:{
            empleado:value,
            idVolante:this.props.id
          }
        })
        .then((response) => {
            this.setState({data:response.data})
        })
    }
  }

  render(){

    return(
      <div className="form-container">
        <div className="row">

          <div className="col-lg-5">
            <label>Respuestas de:</label>
            <select name="empleado" required className="form-control" onChange={this.HandleChangeSelect}>
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
      </div>

      <div className="row">
      <div className="col-lg-12">
        <ReactTable
          data={this.state.data}
          columns={this.columns}
          pageSizeOptions={[10,15,20,25,30]}
          defaultPageSize={10}
          className="-highlight"
          previousText='Anterior'
          filterable={false}
          nextText='Siguiente'
          noDataText='Sin Datos'
          pageText='Pagina'
          rowsText='Registros'
          resizable={true}
          ofText= 'de'
          getTrProps={this.Handle_Click}
        />
      </div>
      </div>
    </div>
    )
  }

}
