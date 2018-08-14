import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
//import Form from './../../Components/Update/Observaciones/Observaciones';

export const dataContext = React.createContext()


class Home extends Component{
  
    render(){
        return(
            <div className="MainContainer">
              <dataContext.Provider value={this.props.data}>
                  <Header {...this.props} />
              </dataContext.Provider>
            </div>
        );
    }
}

Home.defaultProps = {
    texto:'Actualizar Registro',
}

export default Home


  /*
  <Header {...this.props} />
  <Form data={this.props.data} modulo={this.props.modulo}/>
  */
