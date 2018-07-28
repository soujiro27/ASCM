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
            Header:'Tipo',
            accessor:'idTipoDocto'
        },
        {
            Header:'Nombre',
            accessor:'nombre'
        },
        {
            Header:'Estatus',
            accessor:'estatus'
        }
    ]


    componentDidMount(){
        let url = `/SIA/juridico/SubTiposDocumentos/all`;
        fetch(url,{credentials: "same-origin"})
        .then(response => response.json())
        .then(data => this.setState({data,load:true}));

    }

    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
                location.href = `/SIA/juridico/SubTiposDocumentos/${rowInfo.original.idSubTipoDocumento}`
            }
        }
    }

    render(){
        if(this.state.load){
            return( 
                <ReactTable
                data={this.state.data}
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