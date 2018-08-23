import React, { Component } from 'react';
import axios from 'axios';
import Folio from './../shared_components/folio';
import Fechas from './../shared_components/fechas';
import Combos from './../shared_components/Combos'
import ToolTip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css'
import './../form.styl'

class Form extends Component {

    state = {
      subDocumentos:[],
      Numero_Documento:100,
      asunto:3000
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
                document.getElementById('subDocumento').removeAttribute('disabled')
                this.setState({subDocumentos:response.data})
            })
        }
    }

    HandleChangeSubDocumento = (event) =>{
        let index = event.nativeEvent.target.selectedIndex
        let texto = event.nativeEvent.target[index].text
        this.props.modalSubDocumento(texto)
    }

    HandleClickAuditoria = (event) => {
        event.preventDefault();
        this.props.btnAuditoria('AUDITORIA')
    }

    CountCaracterText = (input) =>{
        let max = input.nativeEvent.target.maxLength
        let value_length = input.nativeEvent.target.value.length
        let name = input.nativeEvent.target.name
        this.setState({
            [name]: max - value_length
        })
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
                        <select className="form-control" required  name="subDocumento" onChange={this.HandleChangeSubDocumento} id="subDocumento" disabled>
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
                        <select className="form-control" required name="extemporaneo" >
                            <option value="">Escoja Opcion</option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                    <div className="col-lg-2">
                    <label>Auditoria</label>
                      <ToolTip placement="bottom" overlay={this.props.auditoria}>
                        <button className="btn btn-primary  form-control" onClick={this.HandleClickAuditoria}>
                            Agregar  <i className="fas fa-plus-circle"></i>
                        </button>
                      </ToolTip>
                    </div>
                </div>

            <Folio
                Numero_Documento={this.state.Numero_Documento}
                CountCaracterText={this.CountCaracterText}
            />
            <Fechas />


                <div className="row">
                    <div className="col-lg-12" >
                        <label>Asunto ({this.state.asunto})</label>
                        <textarea rows="4" className="form-control" name="asunto" onChange={this.CountCaracterText} maxLength="3000"></textarea>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12" >
                        <label>Anexar Documento</label>
                        <input type="file" className="form-control" name="file" id="file" />
                    </div>
                </div>

                <Combos
                    caracteres={this.props.caracteres}
                    areas={this.props.areas}
                    acciones={this.props.acciones}
                    multi={false}
                />



                <div className="col-lg-4 submit-group">
                    <input type="submit" value="Guardar" className="btn btn-sm btn-primary" />
                    <button className="btn btn-danger btn-sm" onClick={this.props.cancel}>Cancelar</button>
                </div>
            </div>
            )
    }
}


export default Form;
