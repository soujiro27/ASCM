import React from 'react';
import './Header.styl';

const Header = (props) => (
    <div className="row Header">
            <div className="col-lg-2 Header-title">
                <p className="Header-title-text">Registro {props.modulo}</p>
            </div>
            <div className="col-lg-2 offset-lg-8 Header-button">
                <a  href={'/SIA/juridico/'+props.modulo+'/Add'}  className="btn btn-primary btn-sm">Nuevo Registro</a>
            </div>
        </div>
)

export default Header;
