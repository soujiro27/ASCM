import React, { Component } from 'react';
import Header from './../../Components/Header/Header-cedulas';


import FormInsert from './../../Components/Insert/Diversos/Diversos';
//import FormUpdate from './../../Components/Update/Diversos/Diversos';


class Home extends Component{

  Formulario(props){
    if(props.data.length > 0){
        //return(<FormUpdate data={props.data} />);
        return(<p>Update</p>)
    } else {
      return(<FormInsert id={props.id} nota={props.nota} />);
    }
  }


  render(){
    return(
      <div className="MainContainer">

        <Header {...this.props} />
        <this.Formulario id={this.props.id} data={this.props.data} nota={this.props.nota} />

      </div>

    )
  }
}



Home.defaultProps = {
    texto:'Asignacion',
    menu:[
    	'Asignacion',
    	'Respuestas',
    	'Cedula'
    ],
    active:'Cedula',
    modulo:'DocumentosDiversos'
}

export default Home
