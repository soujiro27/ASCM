import React, { Component } from 'react';
import SelectReact from 'react-select';
import 'react-select/dist/react-select.css';



export default class CombosInputs extends Component {

	state = {
		selectedOption:''
	}


	componentDidMount(){
		let optionSelectAreas = []
		this.props.areas.map(item => {
			optionSelectAreas.push({
				value:item.idArea,
				label:item.nombre
			})
		})
		this.setState({optionSelectAreas})
	}

	handleChangeSelectTurnado = (selectedOption) => {

        this.setState({
            selectedOption:selectedOption
        });
    }

	render(){
		return(
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
                    <div className="col-lg-4">
                        <label>Turnado a:</label>
                       	 <SelectReact
	                        name="turnado"
	                        value={this.state.selectedOption}
	                        multi={this.props.multi}
	                        labelKey='value'
	                        joinValues={true}
	                        className='small-font'
	                        onChange={this.handleChangeSelectTurnado}
	                        options={this.state.optionSelectAreas}
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

		)
	}
}
