
import React from 'react';
import Header from './../../Components/Header/Header-add';
import Table from '../../Components/Tablas/Container/Volantes/Volantes';


const Home = (props) => {

  return(
    <div className="MainContainer">
        <Header modulo={props.modulo} />
        <Table {...props} />
    </div>
  )
}


Home.defaultProps = { modulo:'Volantes' };

export default Home;
