import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import './modal.styl'

class NotalModal extends Component {

    state = { data:[] }

    formData = {
      idRemitenteJuridico:'',
      idRemitente:''
    }

    columns = [
        {
            Header:'Saludo',
            accessor:'saludo',
            width:70
        },
        {
            Header:'Nombre',
            accessor:'nombre',
            width:250
        },
        {
            Header:'puesto',
            accessor:'puesto',
        },
        {
            Header:'Siglas',
            accessor:'siglasArea',
            width:100
        }

    ]

    HandleCloseModal = () => {
      this.props.close(this.formData)
    }

    HandleClickTr = (state, rowInfo) =>{
        return {
            onClick:(e,handleOriginal) =>{
              let datos = rowInfo.original
              let nombre = datos.saludo + ' ' + datos.nombre;
              let texto = nombre + ' - ' +datos.puesto;
              document.getElementById('remitente_seleccion').innerHTML = texto;
              this.formData['idRemitenteJuridico'] = datos.idRemitenteJuridico;
              this.formData['idRemitente'] = datos.siglasArea;
            }
        }
    }


    componentDidMount(){
      let tipo = localStorage.getItem('tipoRemitente');
        axios.get('/SIA/juridico/Api/Remitentes/Tipo',{params:{tipo}})
        .then((response)=>{
           this.setState({data:response.data})
        });
    }


    HandleSubmit = () =>{
      this.formData.estatus ? this.props.close(this.formData) : document.getElementById('remitente_seleccion').innerHTML = 'No ha Seleccionado Remitente'
    }

  render(){
    return ReactDom.createPortal(
    <Modal
        open={true}
        onClose={this.HandleCloseModal}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'auditoria'}}>
        <h4><i className="fas fa-users"></i>  Seleccione Remitente</h4>
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
            <p className='form-control' id="remitente_seleccion">-</p>
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
