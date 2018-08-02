import React, { Component } from 'react';
import axios from 'axios';
import SelectReact from 'react-select';
import 'react-select/dist/react-select.css';


class Form extends Component {
    
    state = {
        subDocumentos:[],
        Numero_Documento:50,
        asunto:500,
        selectedOption: ''
    }
    
    optionSelectAreas = [
        {value: 'DAJPA', label: 'DIRECCIÓN DE ASESORÍA JURíDICA Y PROMOCIÓN DE ACCIONES'},
        {value: 'DCPA', label: 'DIRECCIÓN CONTENCIOSA Y DE PROMOCIÓN DE ACCIONES'},
        {value: 'DIJPA', label: 'DIRECCIÓN DE INTERPRETACIÓN JURíDICA Y PROMOCIÓN DE ACCIONES'},
        {value: 'DN', label: 'DIRECCIÓN DE NORMATIVIDAD'},
        {value:'DGAJ', label:'DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS'}   
    ]

    handleChangeSelectTurnado = (selectedOption) => {
     
        this.setState({ 
            selectedOption:selectedOption
            });
        
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
            this.props.remitente(value)
        }
        
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
                        <select className="form-control" required  name="subDocumento" id="subDocumento">
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

                <div className="row">
                        <div className="col-lg-2">
                            <label>Folio</label>
                            <input type="number" max="999" min="1" required name="folio" className="form-control" />
                        </div>
                        <div className="col-lg-2">
                            <label>Sub Folio</label>
                            <input type="number" max="999" min="0" required name="subFolio" className="form-control" />
                        </div>

                        <div className="col-lg-4">
                            <label>Numero de Documento ({this.state.Numero_Documento})</label>
                            <input type="text" maxLength="50" required name="Numero_Documento" className="form-control"  onChange={this.CountCaracterText}/>
                        </div>
                        <div className="col-lg-2">
                            <label>Anexos</label>
                            <input type="number" max="999" min="0" required name="anexos" className="form-control" />
                        </div>
                </div>

                <div className="row">
                    <div className="col-lg-3">
                        <label>Fecha Documento</label>
                        <input type="date" className="form-control" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])" placeholder="YYYY-MM-DD" name="fecha_documento" required/>
                    </div>
                    <div className="col-lg-3">
                        <label>Fecha Recepcion</label>
                        <input type="date" className="form-control" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])" placeholder="YYYY-MM-DD" name="fecha_recepcion" required/>
                    </div>
                    <div className="col-lg-3">
                        <label>Hora Recepcion</label>
                        <input type="time" className="form-control"  name="hora_recepcion" required 
                        patter="(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}" placeholder="HH:MM" />
                    </div>
                </div>
                <div className="row">
                        <div className="col-lg-2">
                            <label>Remitente</label>
                            <select className="form-control" onChange={this.HandleChangeRemitente}>
                                <option value="">Escoja Opcion</option>
                                <option value="I">Interno</option>
                                <option value="E">Externo</option>
                            </select>
                        </div>
                        <div className="col-lg-2">
                            <label>Agregar Remitente</label>
                            <button className="btn btn-primary form-control" onClick={this.HandleClickRemitente}>Agregar</button>
                        </div>
                </div>

                <div className="row">
                    <div className="col-lg-5" >
                        <label>Nombre</label>
                        <p className="form-control">{this.props.dataRemitente.saludo} {this.props.dataRemitente.nombre}</p>
                    </div>
                    <div className="col-lg-7" >
                        <label>Puesto</label>
                        <p className="form-control">{this.props.dataRemitente.puesto}</p>
                    </div>
                </div>

               

                <div className="row">
                    <div className="col-lg-12" >
                        <label>Asunto ({this.state.asunto})</label>
                        <textarea rows="4" className="form-control" name="asunto" onChange={this.CountCaracterText} maxLength="500"></textarea>
                    </div>
                </div>

                

                <div className="row">
                    <div className="col-lg-12" >
                        <label>Anexar Documento</label>
                        <input type="file" className="form-control" name="file" id="file" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-3">
                        <label>Caracter</label>
                        <select className="form-control" required  name="caracter">
                            <option value="">Escoja Opcion</option>
                            {
                                this.props.caracteres.map((item) =>(
                                    <option key={item.idCaracter} value={item.idCaracter}>{item.nombre}</option>
                                ))
                            }
                        </select>   
                    </div>
                    <div className="col-lg-6">
                        <label>Turnado a:</label>
                        <SelectReact
                        name="turnado"
                        value={this.state.selectedOption}
                        multi={true}
                        labelKey='value'
                        joinValues={true}
                        className='small-font'
                        onChange={this.handleChangeSelectTurnado}
                        options={this.optionSelectAreas}
                    />
                    </div>
                    <div className="col-lg-3">
                        <label>Accion</label>
                        <select className="form-control" required  name="accion">
                            <option value="">Escoja Opcion</option>
                            {
                                this.props.acciones.map((item) =>(
                                    <option key={item.idAccion} value={item.idAccion}>{item.nombre}</option>
                                ))
                            }
                        </select>   
                    </div>
                </div>
                
                <div className="form-hidden">
                        <input type="hidden" name="idRemitenteJuridico" value={this.props.dataRemitente.idRemitenteJuridico} />
                        <input type="hidden" name="idRemitente" value={this.props.dataRemitente.idRemitente} />
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
