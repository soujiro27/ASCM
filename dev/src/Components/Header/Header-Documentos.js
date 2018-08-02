import React, { Component } from 'react';
import './Header.styl';



export default class HeaderDocumentos extends Component {
    
    HandleClick = () =>{
        this.props.modalAnexo()
    }

    render(){
        return(
            <div className="row Header">
            <div className="col-lg-2 Header-title">
                <p className="Header-title-text">{this.props.texto}</p>
            </div>
            <div className="col-lg-2 offset-lg-8 Header-button">
                <button 
                    className="btn btn-success btn-sm" 
                    onClick={this.HandleClick}>
                    Anexar Documento
                </button>
            </div>
        </div>
        )
    }
}

