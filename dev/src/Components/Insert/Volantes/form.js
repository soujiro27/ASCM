import React, { Component } from 'react';
import axios from 'axios';

import './../../shared_styles/text-editor.styl'

class Form extends Component {
    
    state = {
        subDocumentos:[],
        cuenta:2016,
    }
    

    HandleChangeSelect = (event) =>{
        let value = event.target.value
        if(value != '')
        {
            let url = '/SIA/juridico/Api/SubDocumentos'
            axios.get(url,{
                params:{
                    tipo:value,
                    auditoria:'SI'
                }
            })
            .then((response) => {
                this.setState({subDocumentos:response.data})
            })
        }
    }

    HandleTextEditor = (html) =>{
        this.setState({text:html})
    }

    HandleChangeSubDocumento = (event) =>{
        var index = event.nativeEvent.target.selectedIndex
        let texto = event.nativeEvent.target[index].text
        this.props.modalSubDocumento(texto)
    }

    HandleClickAuditoria = (event) => {
        event.preventDefault();
        this.props.btnAuditoria()
    }

    render(){
        return(
            <div className="form-container"> 
                <div className="row">
                    <div className="col-lg-3">
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

                    <div className="form-group col-lg-3">
                        <label>Sub-Documento</label>
                        <select className="form-control" required  name="subDocumento" onChange={this.HandleChangeSubDocumento} id="subDocumento">
                        <option value="">Escoja Opcion</option>
                        {
                            this.state.subDocumentos.map((item) =>(
                                <option key={item.idSubTipoDocumento} value={item.idSubTipoDocumento}>{item.nombre}</option>
                            ))
                        }
                        </select>
                    </div>
                    <div className="col-lg-2">
                    <label>Promocion</label>
                        <select className="form-control" required name="promocion" >
                            <option value="">Escoja Opcion</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>

                    <div className="col-lg-2">
                    <label>Extemporaneo</label>
                        <select className="form-control" required name="promocion" >
                            <option value="">Escoja Opcion</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    <div className="col-lg-2">
                    <label>Auditoria</label>
                        <button className="btn btn-primary  form-control" onClick={this.HandleClickAuditoria}>Agregar</button>
                    </div>
                </div>
                
                <div className="form-hidden">
                        <input type="hidden" name="nota" value={this.props.formData.nota} />
                </div>
                <div className="col-lg-4 submit-group">
                    <input type="submit" value="Guardar" className="btn btn-sm btn-primary" />
                    <button className="btn btn-danger btn-sm" onClick={this.props.cancel}>Cancelar</button>
                </div>
            </div>
            )
    }
}


export default Form;

