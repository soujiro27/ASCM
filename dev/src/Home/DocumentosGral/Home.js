import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Table from '../../Components/Tablas/Container/Documentos/DocumentosGral';


const Home = (props) => {

  return(
    <div className="MainContainer">
        <Header modulo={props.modulo} />
        <Table {...props} />
    </div>
  )
}

Home.defaultProps = { modulo:'DocumentosGral' };

export default Home;
