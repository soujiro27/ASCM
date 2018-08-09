import React, { Component } from 'react';
import Header from './../../Components/Header/Header-cedulas';


import FormInsert from './../../Components/Insert/Ifa/Ifa';
import FormUpdate from './../../Components/Update/Ifa/Ifa';


class Home extends Component{

  Formulario(props){
    if(props.data.length > 0){
        //formulario update
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
    modulo:'Ifa'
}

export default Home
