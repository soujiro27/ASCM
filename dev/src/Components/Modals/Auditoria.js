import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import axios from 'axios';
import Modal from 'react-responsive-modal';
import './modal.styl'

class AuditoriaModal extends Component {
    
    state = {
        cuenta:this.props.cuenta.cuenta,
        tableData:{
            visible:false,
            cveAuditoria:'',
            area:'',
            rubro:'',
            sujeto:'',
            tipo:'',
            turno:''
        },
        tableTurno:{
            visible:false,
            data:''
        }
    }

    HandleCloseModal = () => {
        
        this.props.close(this.state.tableData.area,this.state.tableData.cveAuditoria,this.state.cuenta)
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
        let cuenta = this.props.cuenta.cuenta

        axios.all([this.DatosAuditoria(clave,cuenta),this.DatosTurnadoAuditoria(clave,cuenta)])
        .then(axios.spread((datos,turnos)=>{

            if(Object.keys(datos.data).length > 1 ){
            this.setState({
                cuenta:this.state.cuenta,
                tableData:{
                    visible:true,
                    area:datos.data.idArea,
                    rubro:datos.data.rubro,
                    sujeto:datos.data.sujeto,
                    tipo:datos.data.tipo,
                    cveAuditoria:datos.data.id
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
                <p>Escriba el numero de Auditoria solicitado</p>
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
                </tr>
                <tr>
                    <td>{this.state.tableData.rubro}</td>
                    <td>{this.state.tableData.sujeto}</td>
                    <td>{this.state.tableData.tipo}</td>
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