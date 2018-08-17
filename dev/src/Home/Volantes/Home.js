
import React from 'react';
import Header from './../../Components/Header/Header-add';
import Table from '../../Components/Tablas/Container/Volantes/Volantes';


const Home = (props) => {

  return(
    <div className="MainContainer">
        <Header modulo='Volantes' />
        <Table data={props.data} />
    </div>
  )
}


export default Home;
