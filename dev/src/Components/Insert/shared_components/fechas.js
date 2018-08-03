import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default class fechas extends Component {


    HandleDayClicK = (day) => {
        console.log(day)
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
                <input type="date" className="form-control" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])" placeholder="YYYY-MM-DD" name="fecha_recepcion" required/>
            </div>
            <div className="col-lg-3">
                <label>Hora Recepcion</label>
                <input type="time" className="form-control"  name="hora_recepcion" required 
                patter="(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}" placeholder="HH:MM" />
            </div>
        </div>

        )
    }
}

/*

<input type="date" className="form-control" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])" placeholder="YYYY-MM-DD" name="fecha_documento" required/>
*/