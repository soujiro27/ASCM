import React, { Component } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import 'react-table/react-table.css';
import './../Table.styl';
import columnas from './columns.js'

class TableContainer extends Component{

    state = {
        data:[],
        loader:true
    }

    Load = () =>{
        if(this.state.loader){
            return (<div className="loader">Loading...</div>)  
        } else {
            return(
                <ReactTable
                  data={this.state.data}
                  columns={this.columns()}
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
                />) 
        }
    }


    columns = () =>{
      if(this.props.modulo === 'VolantesDiversos'){
          columnas.splice(7,1);
      }
      return columnas;
    }

    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
                localStorage.setItem('idVolante',rowInfo.original.idVolante);
                location.href = `/SIA/juridico/${this.props.modulo}/Update`;
            }
        }
    }
    
    componentDidMount(){
        this.getDataTable(this.props.year);
        
    }

    componentWillReceiveProps(props){
        this.setState({loader:true});
        this.getDataTable(props.year);
    }
    

    getDataTable = (year) =>{
        axios.get('/SIA/juridico/Volantes/All',{params:{year}})
        .then(response =>{
            this.setState({data:response.data.data,loader:false})
        })
    }

    render(){return <this.Load />}
}

export default TableContainer;
