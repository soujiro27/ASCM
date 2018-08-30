
import React from 'react';
import Header from './../../Components/Header/Header-text';
import Table from '../../Components/Tablas/Container/Cedulas/Irac';


const Home = (props) => {

  return(
    <div className="MainContainer">
        <Header texto={props.texto} />
        <Table {...props} />
    </div>
  )
}


Home.defaultProps = { texto:'Irac' };

export default Home;
