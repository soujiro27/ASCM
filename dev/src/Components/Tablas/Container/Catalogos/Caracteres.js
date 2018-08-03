import React, { Component } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
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
            Header:'Siglas',
            accessor:'siglas'
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
        let url = `/SIA/juridico/Caracteres/all`;

        axios.get(url).then(response =>{
            let data = response.data
            if(response.status === 200){
                this.setState({data,load:true})
            }
        })
    }

    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
                location.href = `/SIA/juridico/Caracteres/${rowInfo.original.idCaracter}`
            }
        }
    }

    render(){
        if(this.state.load){
            return( 
                <ReactTable
                data={this.state.data}
                columns={this.columns}
                pageSizeOptions={[5]}
                defaultPageSize={5}
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