import React from 'react';
import './Header.styl';

const Header = (props) => (
    <div className="row Header">
            <div className="col-lg-2 Header-title">
                <p className="Header-title-text">{props.texto}</p>
            </div>
        </div>
)

export default Header;