import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Form from './../../Components/Update/Volantes/Volantes';

const Update = (props) =>{
    return(
        <div className="MainContainer">
            <Header texto = {props.texto} />
            <Form {...props} />
        </div>

    )
}

Update.defaultProps = {
    texto:'Actualizar Registro',
}

export default Update
