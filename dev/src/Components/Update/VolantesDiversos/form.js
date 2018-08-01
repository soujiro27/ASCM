import React, { Component } from 'react';
import SelectReact from 'react-select';
import 'react-select/dist/react-select.css';

class Form extends Component {
    
    state = {
        Numero_Documento:50,
        asunto:500,
        selectedOption: []
    }
    

    CountCaracterText = (input) =>{
        let max = input.nativeEvent.target.maxLength
        let value_length = input.nativeEvent.target.value.length
        let name = input.nativeEvent.target.name
        this.setState({
            [name]: max - value_length
        })
        
        
    }

    componentDidMount(){
        let select = []
        console.log(this.props.datos)
       this.props.datos.forEach(element => {
                let object = {
                    value:element.idAreaRecepcion,
                    label:element.nombre
                }
                select.push(object)
        });

        this.setState({
            selectedOption:select
        })
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



    render(){
        //console.log(this.props.datos)
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
                            <input type="text" maxLength="50" required name="Numero_Documento" className="form-control"  onChange={this.CountCaracterText} defaultValue={this.props.datos[0].numDocumento}/>
                        </div>
                        <div className="col-lg-2">
                            <label>Anexos</label>
                            <input type="number" max="999" min="0" required name="anexos" className="form-control" defaultValue={this.props.datos[0].anexos}/>
                        </div>
                </div>

                <div className="row">
                    <div className="col-lg-3">
                        <label>Fecha Documento</label>
                        <input type="date" className="form-control" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])" placeholder="YYYY-MM-DD" name="fecha_documento" required defaultValue={this.props.datos[0].fDocumento}/>
                    </div>
                    <div className="col-lg-3">
                        <label>Fecha Recepcion</label>
                        <input type="date" className="form-control" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])" placeholder="YYYY-MM-DD" name="fecha_recepcion" required defaultValue={this.props.datos[0].fRecepcion}/>
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
                        <textarea rows="4" className="form-control" name="asunto" onChange={this.CountCaracterText} maxLength="500">{this.props.datos[0].asunto}</textarea>
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
               
                <div className="col-lg-4 submit-group">
                    <input type="submit" value="Guardar" className="btn btn-sm btn-primary" />
                    <button className="btn btn-danger btn-sm" onClick={this.props.cancel}>Cancelar</button>
                </div>
            </div>
            )
    }
}


export default Form;

