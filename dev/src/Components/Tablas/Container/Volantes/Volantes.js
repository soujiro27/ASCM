import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './../Table.styl'
import columnas from './columns.js'

class TableContainer extends Component{

<<<<<<< HEAD
  
    columns = columnas;

=======
    columns = () =>{
      if(this.props.modulo === 'VolantesDiversos'){
          columnas.splice(7,1);
      }
      return columnas;
    }
>>>>>>> nuevo

    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
                localStorage.setItem('idVolante',rowInfo.original.idVolante);
                location.href = `/SIA/juridico/${this.props.modulo}/Update`;
            }
        }
    }

    render(){
      return(
        <ReactTable
          data={this.props.data}
          columns={this.columns()}
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
