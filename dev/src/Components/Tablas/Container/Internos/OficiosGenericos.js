import React, { Component } from 'react';
import ReactTable from 'react-table';
import axios from 'axios'
import 'react-table/react-table.css';
import { GridLoader } from 'react-spinners';
import './../spiner.styl'
import './../Table.styl'

class TableContainer extends Component{

    state = {
        load:false,
        data:{}
    }

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


    componentDidMount(){
        let url = `/SIA/juridico/Diversos-Internos/all`;
        axios.get(url).then(response =>{
            if(response.status === 200){
                let data = response.data
                this.setState({data,load:true})
            }
        })
    }

    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
              localStorage.setItem('idVolante',rowInfo.original.idVolante)
              localStorage.setItem('modulo','Diversos-Internos')
                location.href = `/SIA/juridico/Asignacion/${rowInfo.original.idVolante}`
            }
        }
    }

    render(){
        if(this.state.load){
            return(
                <ReactTable
                data={this.state.data}
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
        } else {
            return(
                <div className="spiner">
                    <GridLoader
                        color={'#851B07'}
                        loading={!this.state.load}
                    />
                </div>
            )
        }

    }
}

export default TableContainer;
