import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './../Table.styl'

class TableContainer extends Component{


    columns = [
        {
            Header:'Folio',
            accessor:'folio'
        },
        {
            Header:'SubFolio',
            accessor:'subFolio'
        },
        {
            Header:'Documento',
            accessor:'numDocumento'
        },
        {
            Header:'Remitente',
            accessor:'idRemitente'
        },
        {
            Header:'Asunto',
            accessor:'asunto'
        },
        {
            Header:'Fecha Recepcion',
            accessor:'fRecepcion'
        },
        {
            Header:'Desfazado',
            accessor:'extemporaneo'
        },
        {
            Header:'Auditoria',
            accessor:'clave'
        },
        {
            Header:'Estado',
            accessor:'idEstadoTurnado'
        }
    ]


    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
                sessionStorage.setItem('idVolante',rowInfo.original.idVolante)
                sessionStorage.setItem('modulo','Confronta')
                sessionStorage.setItem('nota',rowInfo.original.notaConfronta)
                location.href = `/SIA/juridico/Asignacion`
            }
        }
    }

    render() {

        return ( <
            ReactTable data = {
                this.props.data
            }
            columns = {
                this.columns
            }
            pageSizeOptions = {
                [15, 20, 25, 30]
            }
            defaultPageSize = {
                10
            }
            className = "-highlight"
            previousText = 'Anterior'
            filterable = {
                true
            }
            nextText = 'Siguiente'
            noDataText = 'Sin Datos'
            pageText = 'Pagina'
            rowsText = 'Registros'
            resizable = {
                true
            }
            ofText = 'de'
            getTrProps = {
                this.Handle_Click
            }
            />

        )


    }
}

export default TableContainer;
