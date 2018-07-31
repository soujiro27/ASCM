import React, { Component } from 'react';

import './Header.styl';
import axios from 'axios';


export default class HeaderVolantes extends Component {
    
    HandleClickExport = (event) =>{
        axios.get('/SIA/juridico/Api/Export')
        .then((response) => {
            if(response.status === 200){
                location.href = '/SIA/jur/export/volantes/volantes.xlsx'
            }
        })
    }

    render(){
        return(
            <div className="row Header">
            <div className="col-lg-2 Header-title">
                <p className="Header-title-text">{this.props.texto}</p>
            </div>
            <div className="col-lg-2 offset-lg-6 Header-button">
                <a  href={'/SIA/juridico/'+this.props.modulo+'/add'}  className="btn btn-primary btn-sm">{this.props.textoButton}</a>
            </div>
            <div className="col-lg-2 Header-button">
                <button  className="btn btn-success btn-sm" onClick={this.HandleClickExport}>Exportar Datos</button>
            </div>
        </div>
        )
    }
}

