import React, { Component } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import 'react-table/react-table.css';

class TableContainer extends Component{

    columns = [
        {
            Header:'Siglas',
            accessor:'siglas'
        },
        {
            Header:'Nombre',
            accessor:'nombre'
        },
        {
            Header:'Estatus',
            accessor:'estatus'
        }
    ]


    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
              sessionStorage.removeItem('idCaracter')
              sessionStorage.setItem('idCaracter',rowInfo.original.idCaracter)
                location.href = `/SIA/juridico/Caracteres/Update`
            }
        }
    }

    render(){
      return(
        <ReactTable
          data={this.props.data}
          columns={this.columns}
          pageSizeOptions={[5]}
          defaultPageSize={5}
          className="-highlight"
          previousText='Anterior'
          nextText='Siguiente'
          noDataText='Sin Datos'
          pageText='Pagina'
          ofText= 'de'
          getTrProps={this.Handle_Click}
      />
    )
  }
}

export default TableContainer;
