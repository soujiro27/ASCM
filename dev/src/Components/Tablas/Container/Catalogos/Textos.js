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


    componentDidMount(){
        let url = `/SIA/juridico/Textos/all`;
        fetch(url,{credentials: "same-origin"})
        .then(response => response.json())
        .then(data => this.setState({data,load:true}));

    }

    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
                location.href = `/SIA/juridico/Textos/${rowInfo.original.idAccion}`
            }
        }
    }

    render(){
        if(this.state.load){
            return( 
                <ReactTable
                data={this.state.data}
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