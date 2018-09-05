import React, { Component } from 'react';
import ReactTable from 'react-table';
import axios from 'axios'
import 'react-table/react-table.css';


class TableContainer extends Component{


    columns = [
        {
            Header:'Documento',
            accessor:'idTipoDocto',
            width:100
        },
        {
            Header:'Texto',
            accessor: props =>{
                let parse = new DOMParser()
                let el = (parse.parseFromString(props.texto,'text/html'))
                return el.body.textContent
            },
            id:'id'

        },
        {
            Header:'Estatus',
            accessor:'estatus',
            width:120
        },
]



    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
              sessionStorage.removeItem('idTexto');
              sessionStorage.setItem('idTexto',rowInfo.original.idDocumentoTexto);
                location.href = `/SIA/juridico/Textos/Update`
            }
        }
    }

    render(){

      return(
          <ReactTable
          data={this.props.data}
          columns={this.columns}
          pageSizeOptions={[5,10,15]}
          defaultPageSize={10}
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
