import React from 'react';
import './Header.styl';

const Header = (props) => (
    <div className="row Header">
            <div className="col-lg-2 Header-title">
                <p className="Header-title-text">{props.texto}</p>
            </div>
            <div className="col-lg-2 offset-lg-8 Header-button">
                <a  href={'/SIA/juridico/'+props.modulo+'/add'}  className="btn btn-primary btn-sm">{props.textoButton}</a>
            </div>
        </div>
)

export default Header;