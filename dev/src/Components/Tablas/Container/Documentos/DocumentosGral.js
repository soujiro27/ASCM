import React, { Component } from 'react';
import ReactTable from 'react-table';
import axios from 'axios'
import 'react-table/react-table.css';
import './../Table.styl'

class TableContainer extends Component{


    columns = [
        {
            Header:'Folio',
            accessor:'folio',
            width:60
        },
        {
            Header:'SubFolio',
            accessor:'subFolio',
            width:60
        },
        {
            Header:'Oficio',
            accessor:'nombre'
        },
        {
            Header:'Turnado',
            accessor:'idAreaRecepcion',
            width:100
        },
        {
            Header:'Fecha Recepcion',
            accessor:'fRecepcion'
        },
        {
            Header:'Estado',
            accessor:'idEstadoTurnado'
        },
        {
            Header:'Estatus',
            accessor:'estatus'
        }
    ]



    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
                location.href = `/SIA/juridico/DocumentosGral/${rowInfo.original.idTurnadoJuridico}`
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
            />
            )
    }
}

export default TableContainer;
