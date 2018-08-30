import React, { Component } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import columns from './columsAuditoria';
import 'react-table/react-table.css';
import './../Table.styl'

class TableContainer extends Component{

    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) =>{
              sessionStorage.removeItem('idVolante');
              sessionStorage.removeItem('modulo');
              sessionStorage.setItem('idVolante',rowInfo.original.idVolante)
              sessionStorage.setItem('modulo','Irac')
              location.href = `/SIA/juridico/Asignacion`
            }
        }
    }

    render(){
      return(
          <ReactTable
            data={this.props.data}
            columns={columns}
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
          />
            )
    }
}

export default TableContainer;
