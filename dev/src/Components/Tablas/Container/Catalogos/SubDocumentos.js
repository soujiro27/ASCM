import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';


class TableContainer extends Component{



    columns = [
        {
            Header:'Tipo',
            accessor:'idTipoDocto'
        },
        {
            Header:'Nombre',
            accessor:'nombre'
        },
        {
            Header:'Auditoria',
            accessor:'auditoria'
        },
        {
            Header:'Estatus',
            accessor:'estatus'
        }
    ]

    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
                sessionStorage.removeItem('idSubDocumento')
                sessionStorage.setItem('idSubDocumento',rowInfo.original.idSubTipoDocumento)
                location.href = `/SIA/juridico/SubTiposDocumentos/Update`
            }
        }

    }

    render(){

            return(
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

            )
        
    }
}

export default TableContainer;
