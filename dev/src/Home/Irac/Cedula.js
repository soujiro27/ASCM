import React, { Component } from 'react';
import Header from './../../Components/Header/Header-cedulas';


import FormInsert from './../../Components/Insert/Irac/Irac';
import FormUpdate from './../../Components/Update/Irac/Irac';


class Home extends Component{

  Formulario(props){
    if(props.data.length > 0){
        return(<FormUpdate data={props.data} />);
    } else {
      return(<FormInsert id={props.id} />);
    }
  }


  render(){
    return(
      <div className="MainContainer">

        <Header {...this.props} />
        <this.Formulario id={this.props.id} data={this.props.data} />

      </div>

    )
  }
}



Home.defaultProps = {
    texto:'Asignacion',
    menu:[
    	'Asignacion',
    	'Respuestas',
    	'Observaciones',
    	'Cedula'
    ],
    active:'Cedula',
    modulo:'Irac'
}

export default Home
