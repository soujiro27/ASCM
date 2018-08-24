import React, { Component } from 'react';
import axios from 'axios';
import SelectReact from 'react-select';
import 'react-select/dist/react-select.css';

import Folio from './../shared_components/folio';
import Fechas from './../shared_components/fechas';
import Combos from './../shared_components/combos';


class Form extends Component {

    state = {
        subDocumentos:[],
        Numero_Documento:50,
        asunto:500,
    }

    HandleChangeSelect = (event) =>{
        let value = event.target.value
        if(value != '')
        {
            let url = '/SIA/juridico/Api/SubDocumentos'
            axios.get(url,{
                params:{
                    tipo:value,
                    auditoria:'NO'
                }
            })
            .then((response) => {
                document.getElementById('subDocumento').removeAttribute('disabled')
                this.setState({subDocumentos:response.data})
            })
        }
    }


    CountCaracterText = (input) =>{
        let max = input.nativeEvent.target.maxLength
        let value_length = input.nativeEvent.target.value.length
        let name = input.nativeEvent.target.name
        this.setState({
            [name]: max - value_length
        })
    }

    HandleClickRemitente = (event) =>{
        event.preventDefault()
        this.props.addRemitente()
    }

    HandleChangeRemitente = (event) =>{
        let value = event.target.value
        if(value != ''){
          localStorage.setItem('tipoRemitente',value);
          this.props.openModal('REMITENTE');
        }

    }


    render(){
        return(
            <div className="form-container">
                <div className="row">
                    <div className="col-lg-4">
                        <label>Documento</label>
                        <select className="form-control" required onChange={this.HandleChangeSelect} name="documento">
                            <option value="">Escoja Opcion</option>
                            {
                                this.props.documentos.map((item) =>(
                                    <option key={item.idTipoDocto} value={item.idTipoDocto}>{item.nombre}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="form-group col-lg-4">
                        <label>Sub-Documento</label>
                        <select className="form-control" required  name="subDocumento" id="subDocumento" disabled>
                        <option value="">Escoja Opcion</option>
                        {
                            this.state.subDocumentos.map((item) =>(
                                <option key={item.idSubTipoDocumento} value={item.idSubTipoDocumento}>{item.nombre}</option>
                            ))
                        }
                        </select>
                    </div>

                    <div className="col-lg-2">
                    <label>Extemporaneo</label>
                        <select className="form-control" required name="extemporaneo" >
                            <option value="">Escoja Opcion</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                </div>


                <Folio />

              <Fechas />
                <div className="row">
                        <div className="col-lg-3">
                            <label>Selecciona Remitente</label>
                            <select className="form-control" onChange={this.HandleChangeRemitente} >
                                <option value="">Escoja Opcion</option>
                                <option value="I">Interno</option>
                                <option value="E">Externo</option>
                            </select>
                        </div>
                        <div className="col-lg-2">
                            <label>Nuevo Remitente</label>
                            <button className="btn btn-primary btn-remitente" onClick={this.HandleClickRemitente}>Agregar  <i className="fas fa-plus-circle"></i></button>
                        </div>


                </div>

                <div className="row">
                    <div className="col-lg-5" >
                        <label>Nombre</label>
                        <p className="form-control">nombre remitente</p>
                    </div>
                    <div className="col-lg-5" >
                        <label>Puesto</label>
                        <p className="form-control">puesto Remietente</p>
                    </div>
                </div>



                <div className="row">
                    <div className="col-lg-10" >
                        <label>Asunto ({this.state.asunto})</label>
                        <textarea rows="4" className="form-control" name="asunto" onChange={this.CountCaracterText} maxLength="3000"></textarea>
                    </div>
                </div>



                <div className="row">
                    <div className="col-lg-10" >
                        <label>Anexar Documento</label>
                        <input type="file" className="form-control" name="file" id="file" />
                    </div>
                </div>

                <Combos
                        caracteres={this.props.caracteres}
                        areas={this.props.areas}
                        acciones={this.props.acciones}
                        multi={true}
                />

<<<<<<< HEAD
              <div className="form-hidden">
                        <input type="hidden" name="idRemitenteJuridico" value={this.props.dataRemitente.idRemitenteJuridico} />
                        <input type="hidden" name="idRemitente" value={this.props.dataRemitente.idRemitente} />
                </div>
=======
>>>>>>> nuevo
                <div className="col-lg-4 submit-group">
                    <input type="submit" value="Guardar" className="btn btn-sm btn-primary" />
                    <button className="btn btn-danger btn-sm" onClick={this.props.cancel}>Cancelar</button>
                </div>
            </div>
            )
    }
}


export default Form;
