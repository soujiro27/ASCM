import React,{Component} from 'react';
import './Header.styl';

export default class Header extends Component {

    HandleChangeYear = (event) => {
        let year = event.target.value;
        this.props.year(year);
    }


    render(){
        return(
            <div className="row Header">
                <div className="col-lg-2 Header-title">
                    <p className="Header-title-text">Registro de {this.props.modulo}</p>
                </div>
                <div className="col-lg-2">
                    <select className="custom-select custom-select-sm" defaultValue={this.props.now} onChange={this.HandleChangeYear}>
                        {
                            this.props.data.map(item => (
                                <option value={item} key={item}>{item}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-lg-2 offset-lg-6 Header-button">
                <a  href={'/SIA/juridico/'+this.props.modulo+'/Add'}  className="btn btn-primary btn-sm">Nuevo Volante  <i className="fas fa-plus-circle"></i></a>
                </div>
            </div>
        )
    }
}



// <a  href={'/SIA/juridico/'+this.props.modulo+'/Add'}  className="btn btn-primary btn-sm">Nuevo Registro</a>