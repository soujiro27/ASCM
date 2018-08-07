import React, { Component } from 'react';
import Header from './../../Components/Header/Header-cedulas';

//import Form from './../../Components/Update/Acciones/Acciones';

class Home extends Component{


    render(){
        return(
            <div className="MainContainer">
                <Header {...this.props} />
                
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
    ]
}

export default Home

//<Form data={this.props.data}/>   
