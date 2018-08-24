import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import axios from 'axios';
import Modal from 'react-responsive-modal';
import './modal.styl'

class AuditoriaModal extends Component {

    state = {
        tableData:{
            visible:false,
            cveAuditoria:'',
            area:'',
            rubro:'',
            sujeto:'',
            tipo:'',
            turno:'',
<<<<<<< HEAD
            clave:''
=======
            auditoria:''
>>>>>>> nuevo
        },
        tableTurno:{
            visible:false,
            data:''
        }
    }

    HandleCloseModal = () => {
        let datos = this.state.tableData
<<<<<<< HEAD
        this.props.close(datos.area,datos.cveAuditoria,datos.clave)
=======
        this.props.close(datos.area,datos.cveAuditoria,datos.auditoria)
>>>>>>> nuevo
    }


    DatosAuditoria = (clave,cuenta) =>{

        let url = '/SIA/juridico/Api/DatosAuditoria'
        return  axios.get(url,{params:{cuenta,clave}})
    }

    DatosTurnadoAuditoria = (clave,cuenta) =>{
        let url = '/SIA/juridico/Api/TurnadosAuditoria'
        return  axios.get(url,{params:{cuenta,clave}})
    }

    HandleChangeInput = (event) =>{

        let clave= event.target.value
        let cuenta = this.props.cuenta

        axios.all([this.DatosAuditoria(clave,cuenta),this.DatosTurnadoAuditoria(clave,cuenta)])
        .then(axios.spread((datos,turnos)=>{

            if(Object.keys(datos.data).length > 1 ){
            this.setState({
                tableData:{
                    visible:true,
                    area:datos.data.idArea,
                    rubro:datos.data.rubro,
                    sujeto:datos.data.sujeto,
                    tipo:datos.data.tipo,
                    cveAuditoria:datos.data.id,
<<<<<<< HEAD
                    clave:datos.data.clave
=======
                    auditoria:datos.data.auditoria
>>>>>>> nuevo
                },
                tableTurno:{
                    visible:true,
                    data:turnos.data
                }
            })}


        }))
    }



  render(){
    return ReactDom.createPortal(
      <Modal
        open={this.props.visible}
        onClose={this.HandleCloseModal}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'auditoria'}}>

        <div className="row">
            <div className="col-lg-12">
                <h3><i className="fas fa-archive"></i> Escriba el numero de Auditoria solicitado</h3>
            </div>
            <div className="col-lg-12">
                <input type="number" id="auditoria" onChange={this.HandleChangeInput} placeholder="Numero de Auditoria" className="form-control"/>
            </div>
        </div>
        {
            this.state.tableData.visible &&
            <table className="table">
            <tbody>
                <tr>
                    <th>Rubro</th>
                    <th>Sujeto</th>
                    <th>Tipo</th>
                    <th>Auditoria</th>
                </tr>
                <tr>
                    <td>{this.state.tableData.rubro}</td>
                    <td>{this.state.tableData.sujeto}</td>
                    <td>{this.state.tableData.tipo}</td>
                    <td>{this.state.tableData.clave}</td>
                </tr>
                </tbody>
            </table>
        }
        {
            this.state.tableTurno.visible &&
            <table className="table">
            <tbody>
                <tr>
                    <th>Tipo</th>
                    <th>Area</th>
                </tr>
                    {this.state.tableTurno.data.map((item) => (
                        <tr>
                            <td key={item.idAreaRecepcion}>{item.nombre}</td>
                            <td key={item.nombre}>{item.idAreaRecepcion}</td>
                        </tr>

                        ))
                    }
                </tbody>
            </table>
        }
        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default AuditoriaModal;
