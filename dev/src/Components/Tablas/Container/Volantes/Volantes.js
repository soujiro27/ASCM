import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { GridLoader } from 'react-spinners';
import './../spiner.styl'

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
            accessor:'documento'
        },
        {
            Header:'Remitente',
            accessor:'remitente'
        },
        {
            Header:'Turnado',
            accessor:'turnado'
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
            accessor:'auditoria'
        },
        {
            Header:'Oficio',
            accessor:'oficio'
        },
        {
            Header:'Estado',
            accessor:'estado'
        },
        {
            Header:'Estatus',
            accessor:'estatus'
        }
    ]


    componentDidMount(){
        let url = `/SIA/juridico/Volantes/all`;
        fetch(url,{credentials: "same-origin"})
        .then(response => response.json())
        .then(data => this.setState({data,load:true}));

    }

    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
                location.href = `/SIA/juridico/Volantes/${rowInfo.original.idVolante}`
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
                nextText='Siguiente'
                noDataText='Sin Datos'
                pageText='Pagina'
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