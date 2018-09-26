import React, { Component } from 'react';
import axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './../fechas.styl';
import './../form.styl';

class Form extends Component {

    state = {
        Numero_Documento:50,
        asunto:3000
    }

    HandleDayClicK = (day) => {
        //this.setState({day})
    }

    componentDidMount(){
        let input = document.getElementsByClassName('DayPickerInput');
        input[0].children[0].setAttribute('name','fecha_documento')
        input[1].children[0].setAttribute('name','fecha_recepcion')

        let documentos = document.getElementById('documento');
        let caracteres_documento = documentos.value.length;
        let textarea = document.getElementById('asunto');
        let caracteres_asunto = textarea.value.length;

        this.setState({
          Numero_Documento:this.state.Numero_Documento - caracteres_documento ,
          asunto:this.state.asunto - caracteres_asunto
        });

    }



    CountCaracterText = (input) =>{
        let max = input.nativeEvent.target.maxLength
        let value_length = input.nativeEvent.target.value.length
        let name = input.nativeEvent.target.name
        this.setState({
            [name]: max - value_length
        });
    }


    render(){
        return(
            <div className="form-container">
                <div className="row">
                        <div className="col-lg-2">
                            <label>Folio</label>
                            <p className="form-control">{this.props.datos[0].folio}</p>
                        </div>
                        <div className="col-lg-2">
                            <label>Sub Folio</label>
                            <p className="form-control">{this.props.datos[0].subFolio}</p>
                        </div>

                        <div className="col-lg-4">
                            <label>Numero de Documento ({this.state.Numero_Documento})</label>
                            <input type="text" maxLength="50" required name="Numero_Documento" className="form-control"  onChange={this.CountCaracterText} defaultValue={this.props.datos[0].numDocumento} id="documento"/>
                        </div>
                        <div className="col-lg-2">
                            <label>Anexos</label>
                            <input type="number" max="999" min="0" required name="anexos" className="form-control" defaultValue={this.props.datos[0].anexos}/>
                        </div>
                </div>

                <div className="row">
                    <div className="col-lg-3">
                        <label>Fecha Documento</label>
                          <DayPickerInput
                              onDayChange={this.HandleDayClicK}
                              value={this.props.datos[0].fDocumento}
                          />
                    </div>
                    <div className="col-lg-3">
                        <label>Fecha Recepcion</label>
                          <DayPickerInput
                              onDayChange={this.HandleDayClicK}
                              value={this.props.datos[0].fRecepcion}
                          />
                    </div>
                    <div className="col-lg-3">
                        <label>Hora Recepcion</label>
                        <input type="time" className="form-control"  name="hora_recepcion" required
                        patter="(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}" placeholder="HH:MM" defaultValue={this.props.datos[0].hRecepcion.substring(0, 5)}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12" >
                        <label>Asunto ({this.state.asunto})</label>
                        <textarea rows="4" className="form-control" name="asunto" onChange={this.CountCaracterText} maxLength="3000" defaultValue={this.props.datos[0].asunto} id="asunto"></textarea>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-3">
                        <label>Caracter</label>
                        <select className="form-control" required  name="caracter" defaultValue={this.props.datos[0].idCaracter}>
                            <option value="">Escoja Opcion</option>
                            {
                                this.props.caracteres.map((item) =>(
                                    <option key={item.idCaracter} value={item.idCaracter}>{item.nombre}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-lg-7">
                        <label>Turnado a:</label>
                        <select className="form-control" required  name="turnado" defaultValue={this.props.datos[0].idAreaRecepcion}>
                            <option value="">Escoja Opcion</option>
                            {
                                this.props.areas.map((item) =>(
                                    <option key={item.idArea} value={item.idArea}>{item.nombre}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-lg-2">
                        <label>Accion</label>
                        <select className="form-control" required  name="accion" defaultValue={this.props.datos[0].idAccion}>
                            <option value="">Escoja Opcion</option>
                            {
                                this.props.acciones.map((item) =>(
                                    <option key={item.idAccion} value={item.idAccion}>{item.nombre}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="col-lg-12 submit-group">
                    <input type="submit" value="Guardar" className="btn btn-sm btn-primary" />
                    <button className="btn btn-danger btn-sm " onClick={this.props.cancel}>Cancelar</button>
                    <button className="btn btn-warning btn-sm btn-print" >Cerrar Volante</button>
                </div>
            </div>
            )
    }
}


export default Form;
