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
            Header:'Oficio',
            accessor:'nombre'
        },
        {
            Header:'Turnado',
            accessor:'idAreaRecepcion'
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


    componentDidMount(){
        let url = `/SIA/juridico/DocumentosGral/all`;

        axios.get(url).then(response => {
            if(response.status === 200){
                let data = response.data
                this.setState({data,load:true})
            }
        })

    }

    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
                location.href = `/SIA/juridico/DocumentosGral/${rowInfo.original.idTurnadoJuridico}`
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