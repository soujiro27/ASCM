import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './../Table.styl'
import columnas from './columns.js'

class TableContainer extends Component{

  
    columns = columnas;


    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
                location.href = `/SIA/juridico/Volantes/${rowInfo.original.idVolante}`
            }
        }
    }

    render(){
      return(
        <ReactTable
          data={this.props.data}
          columns={this.columns}
          pageSizeOptions={[15,20,25,30]}
          defaultPageSize={10}
          className="-highlight"
          previousText='Anterior'
          filterable={true}
          nextText='Siguiente'
          noDataText='Sin Datos'
          pageText='Pagina'
          rowsText='Registros'
          resizable={true}
          ofText= 'de'
          getTrProps={this.Handle_Click}
        />)
    }
}

export default TableContainer;
