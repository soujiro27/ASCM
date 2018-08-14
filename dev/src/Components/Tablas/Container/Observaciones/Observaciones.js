import React, { Component } from 'react';
import ReactTable from 'react-table';
import axios from 'axios'
import 'react-table/react-table.css';
import { GridLoader } from 'react-spinners';
import './../spiner.styl'
import './Table.styl'

class TableContainer extends Component{

    state = {
        load:false,
        data:{}
    }

    columns = [
        {
            Header:'Pagina',
            accessor:'pagina'
        },
        {
            Header:'Parrafo',
            accessor:'parrafo'
        },
        {
            Header:'Observacion',
            accessor: props => {
              let parse = new DOMParser()
              let el = (parse.parseFromString(props.observacion,'text/html'))
              return el.body.textContent
          },
          id:'id'
        },
        {
            Header:'Estatus',
            accessor:'estatus'
        }
    ]


    componentDidMount(){
        let url = `/SIA/juridico/Api/Observaciones`;
        axios.get(url,{params:{idVolante:this.props.id}}).then(response =>{
            if(response.status === 200){
                let data = response.data
                this.setState({data,load:true})
            }
        })
    }

    Handle_Click = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) => {
                location.href = `/SIA/juridico/Observaciones/Update/${rowInfo.original.idObservacionDoctoJuridico}`
            }
        }
    }

    render(){
        if(this.state.load){
            return(
              <div className="table-container">
                <div className="row">
                  <div className="col-lg-2">
                    <a href={`/SIA/juridico/Observaciones/add/${this.props.id}`} className="btn btn-success btn-sm">Agregar Observacion</a>
                  </div>
                  <div className="col-lg-12">
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
              </div>
              </div>
              </div>

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
