import React, { Component } from 'react';
import ReactTable from 'react-table';
import axios from 'axios'
import 'react-table/react-table.css';

import './Table.styl'

class TableObservaciones extends Component{

    columns = [
        {
            Header:'Pagina',
            accessor:'pagina',
            width:65
        },
        {
            Header:'Parrafo',
            accessor:'parrafo',
            width:65
        },
        {
            Header:'Observacion',
            accessor: props => {
              let parse = new DOMParser()
              let el = (parse.parseFromString(props.observacion,'text/html'))
              return el.body.textContent
          },
          id:'id'
        },
        {
            Header:'Estatus',
            accessor:'estatus',
            width:70
        }
    ]

    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
              sessionStorage.removeItem('idObservacion');
              sessionStorage.setItem('idObservacion',rowInfo.original.idObservacionDoctoJuridico);
                location.href = `/SIA/juridico/Observaciones/Update`
            }
        }
    }

  render(){
    console.log(this.props)
    return(
      <div className="table-container">
        <div className="row">
          <div className="col-lg-2">
            <a href='/SIA/juridico/Observaciones/Add' className="btn btn-success btn-sm">Agregar Observacion</a>
          </div>
        <div className="col-lg-12">
          <ReactTable
            data={this.props.data}
            columns={this.columns}
            pageSizeOptions={[10,15]}
            defaultPageSize={10}
            className="-highlight"
            previousText='Anterior'
            nextText='Siguiente'
            noDataText='Sin Datos'
            pageText='Pagina'
            ofText= 'de'
            getTrProps={this.Handle_Click}
          />
        </div>
      </div>
    </div>
  )

    }
}

export default TableObservaciones;
