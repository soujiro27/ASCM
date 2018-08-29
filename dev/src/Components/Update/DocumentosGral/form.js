import React,{Component} from 'react';
import Switch from "react-switch";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './../form.styl'

export default class UpdateDocumento extends Component {

  columns = [
      {
          Header:'Enviado Por',
          accessor:'areaRemitente',

      },
      {
          Header:'Fecha',
          accessor: props =>{
              return props.fAlta.substr(0,10)
          },
          id:'idFecha'
      },
      {
          Header:'Hora',
          accessor: props =>{
              return props.fAlta.substr(11,5)
          },
          id:'idHora'
      },
      {
          Header:'Archivo',
          accessor:'archivoFinal'
      },
      {
          Header:'Estatus',
          accessor:'estatus'
      }
  ]


  Handle_Click = (state, rowInfo, column) =>{
      return {
          onClick:(e,handleOriginal) => {
            sessionStorage.setItem('idAnexoJuridico',rowInfo.original.idAnexoJuridico);
            sessionStorage.setItem('archivoFinal',rowInfo.original.archivoFinal);
            sessionStorage.setItem('idVolante',rowInfo.original.idVolante);
            sessionStorage.setItem('estatus',rowInfo.original.estatus);
            this.props.open('ESTATUS');
          }
      }
  }

  HandleOpenModal = () =>{
    this.props.open('FILE')
  }

  render(){
    return(
      <div className='table-container'>
        <button className="btn btn-primary form-control" onClick={this.HandleOpenModal}>Anexar Documento  <i className="fas fa-file-alt"></i></button>
        <ReactTable
          data={this.props.data}
          columns={this.columns}
          getTrProps={this.Handle_Click}
          pageSizeOptions={[15,20,25,30]}
          defaultPageSize={10}
          className="-highlight"
          previousText='Anterior'
          nextText='Siguiente'
          noDataText='Sin Datos'
          pageText='Pagina'
          rowsText='Registros'
          resizable={true}
          ofText= 'de'/>
    </div>
    )
  }
}
