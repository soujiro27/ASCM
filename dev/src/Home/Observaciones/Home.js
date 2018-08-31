import React, { Component } from 'react';
import Header from './../../Components/Header/Header-cedulas';
import Table from './../../Components/Tablas/Container/Observaciones/Observaciones';

class Home extends Component{

  render(){
      return(
          <div className="MainContainer">
              <Header {...this.props} />
              <Table {...this.props} />
          </div>

      )
  }
}

Home.defaultProps = { active:'Observaciones'};

export default Home;
