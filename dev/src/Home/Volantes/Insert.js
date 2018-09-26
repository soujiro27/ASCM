import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Form from './../../Components/Insert/Volantes/Volantes';



const Home  = (props) => {
    
    return(
        <div className="MainContainer">
            <Header texto={props.texto} />
            <Form {...props} />
        </div>

    )
}

Home.defaultProps = {
    texto:'Agregar Nuevo Registro',
}

export default Home
