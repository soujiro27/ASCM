import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import './modal.styl'

class NotalModal extends Component {
    
    state = {
        chose:'',
        puesto:'',
        idRemitente:'',
        data:[],
        tipo: this.props.tipo,
        request:''
       
    }

    columns = [
        {
            Header:'Saludo',
            accessor:'saludo',
        },
        {
            Header:'Nombre',
            accessor:'nombre',
           
        },
        {
            Header:'puesto',
            accessor:'puesto',
            

        },
        {
            Header:'Siglas',
            accessor:'siglasArea',
           
        }
       
    ]

    HandleCloseModal = () => {
        //this.props.close(this.state.nota)
    }

    HandleClickTr = (state, rowInfo, column) =>{
        return {
            onClick:(e,handleOriginal) =>{
                let nombre = rowInfo.original.saludo + ' ' + rowInfo.original.nombre
               this.setState({
                    chose: nombre,
                    puesto:rowInfo.original.puesto,
                    idRemitente:rowInfo.original.idRemitenteJuridico,
                    request:rowInfo.original
                })
                
            }
        }
    }


    componentDidMount(){
        axios.get('/SIA/juridico/Api/Remitentes/Tipo',{
            params:{
                tipo:this.props.tipo
            }
        })
        .then((response)=>{
            
           this.setState({data:response.data})
        })
    }


    HandleSubmit = () =>{
        if(this.state.idRemitente != ''){
            this.props.close(this.state.request)
        }
    }

  render(){
    return ReactDom.createPortal(
    <Modal 
        open={this.props.visible} 
        onClose={this.HandleCloseModal}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'remitentes'}}>
        <h4>Seleccione Remitente</h4>
        <div className='col-lg-12'>
            <ReactTable 
                data={this.state.data}
                columns={this.columns}
                pageSizeOptions={[8]}
                defaultPageSize={8}
                className="-highlight"
                previousText='Anterior'
                filterable={true}
                nextText='Siguiente'
                noDataText='Sin Datos'
                pageText='Pagina'
                resizable={true}
                ofText= 'de'
                getTrProps={this.HandleClickTr}
        
            />
        </div>
        <div className='col-lg-12'>
            <p className='form-control'>{this.state.chose} - {this.state.puesto}</p>
        </div>
        <div className='col-lg-12'>
        <button className='btn btn-sm btn-primary' onClick={this.HandleSubmit}>Aceptar</button>
        </div>
        </Modal>,
        document.getElementById('modal')
    )
    }
}

export default NotalModal;