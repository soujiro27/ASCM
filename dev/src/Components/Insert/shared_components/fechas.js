import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import ToolTip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css'

import './fechas.styl';

export default class fechas extends Component {


    state = {
        day:''
    }
    
    HandleDayClicK = (day) => {
        //this.setState({day})
    }

    componentDidMount(){
        let input = document.getElementsByClassName('DayPickerInput');
        //console.log(input[0].children)
        input[0].children[0].setAttribute('name','fecha_documento')
        input[1].children[0].setAttribute('name','fecha_Recepcion')

    }



    render(){
        return(
            <div className="row">
            <div className="col-lg-3">
                <label>Fecha Documento</label>
                <DayPickerInput 
                    onDayChange={this.HandleDayClicK}
                />
            </div>
            <div className="col-lg-3">
                <label>Fecha Recepcion</label>
                 <DayPickerInput 
                    onDayChange={this.HandleDayClicK}
                />
            </div>
            <div className="col-lg-3">
                <label>Hora Recepcion</label>
                <ToolTip placement="right" overlay={<span>Formato 24 Horas</span>}>
                    <input type="time" className="form-control"  name="hora_recepcion" required 
                        patter="(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}" placeholder="HH:MM" />
                </ToolTip>
            </div>
        </div>

        )
    }
}

/*

<input type="date" className="form-control" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])" placeholder="YYYY-MM-DD" name="fecha_documento" required/>
*/