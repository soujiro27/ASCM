import React, { Component } from 'react';
import SelectReact from 'react-select';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-select/dist/react-select.css';
import 'react-day-picker/lib/style.css';
import './../fechas.styl';
import './../form.styl'


class Form extends Component {

    state = {
        documento:50,
        asunto:3000,
        selectedOption: [],
        options:[]
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
      /*-------------------Asigna name a los input date ------------*/
      let input = document.getElementsByClassName('DayPickerInput');
      input[0].children[0].setAttribute('name','fecha_documento')
      input[1].children[0].setAttribute('name','fecha_recepcion')

      /*---------------- Carga los option seleccionados -------------*/
      let select = []
      this.props.datos.map(element => {
        let object = { value:element.idAreaRecepcion, label:element.nombre }
        select.push(object)
      });

    /*------------------- Carga el numero de caracteres Asunto y Numero de Documento --------------*/

      let documentos = document.getElementById('documento').value.length;
      let textarea = document.getElementById('asunto').value.length;


    /*------------------------- Crear los options para el combo Turnado -----------------*/
    let options = []
    this.props.areas.map( element => {
      let object = {value:element.idArea,label:element.nombre}
      options.push(object)
    })

    /*----------- Setea el Estado -----------------------*/
      this.setState({
        documento:this.state.documento - documentos,
        asunto:this.state.asunto - textarea,
        selectedOption:select,
        options: options
      });
    }

    handleChangeSelectTurnado = (selectedOption) => {
      this.setState({ selectedOption:selectedOption });
    }


    HandleChangeRemitente = (event) =>{
        let value = event.target.value
        if(value != ''){
          localStorage.setItem('tipoRemitente',value);
          this.props.openModal('REMITENTE');
        }
    }

    render(){
      console.log(this.props)
      let datos = this.props.datos[0]
        return(
            <div className="form-container">
                <div className="row">
                        <div className="col-lg-2">
                            <label>Folio</label>
                            <p className="form-control">{datos.folio}</p>
                        </div>
                        <div className="col-lg-2">
                            <label>Sub Folio</label>
                            <p className="form-control">{datos.subFolio}</p>
                        </div>

                        <div className="col-lg-4">
                            <label>Numero de Documento ({this.state.documento})</label>
                            <input type="text" maxLength="50" required name="Numero_Documento" className="form-control"  onChange={this.CountCaracterText} defaultValue={datos.numDocumento} id="documento"/>
                        </div>
                        <div className="col-lg-2">
                            <label>Anexos</label>
                            <input type="number" max="999" min="0" required name="anexos" className="form-control" defaultValue={datos.anexos}/>
                        </div>
                        <div className="col-lg-2">
                            <label>Extemporaneo</label>
                            <select className="form-control" required name="extemporaneo" defaultValue={datos.extemporaneo}>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>
                        </select>
                        </div>
                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <label>Fecha Documento</label>
                          <DayPickerInput
                              onDayChange={this.HandleDayClicK}
                              value={datos.fDocumento}
                          />
                    </div>
                    <div className="col-lg-4">
                        <label>Fecha Recepcion</label>
                          <DayPickerInput
                              onDayChange={this.HandleDayClicK}
                              value={datos.fRecepcion}
                          />
                    </div>
                    <div className="col-lg-4">
                        <label>Hora Recepcion</label>
                        <input type="time" className="form-control"  name="hora_recepcion" required
                        patter="(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}" placeholder="HH:MM" defaultValue={datos.hRecepcion.substring(0, 5)}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-2">
                        <label>Remitente</label>
                        <select className="form-control" onChange={this.HandleChangeRemitente} >
                            <option value="">Escoja Opcion</option>
                            <option value="I">Interno</option>
                            <option value="E">Externo</option>
                        </select>
                    </div>
                    <div className="col-lg-5">
                        <label>Nombre</label>
                        <p className="form-control">{datos.nombreRemitente}</p>
                    </div>

                    <div className="col-lg-5">
                        <label>Puesto</label>
                        <p className="form-control">{datos.puestoRemitente}</p>
                    </div>

                </div>

                <div className="row">
                    <div className="col-lg-12" >
                        <label>Asunto ({this.state.asunto})</label>
                        <textarea rows="4" className="form-control" name="asunto" onChange={this.CountCaracterText} maxLength="500" defaultValue={datos.asunto} id="asunto"></textarea>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-3">
                        <label>Caracter</label>
                        <select className="form-control" required  name="caracter" defaultValue={datos.idCaracter}>
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
                            joinValues={false}
                            className='small-font'
                            onChange={this.handleChangeSelectTurnado}
                            options={this.state.options}
                        />
                    </div>
                    <div className="col-lg-3">
                        <label>Accion</label>
                        <select className="form-control" required  name="accion" defaultValue={datos.idAccion}>
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
