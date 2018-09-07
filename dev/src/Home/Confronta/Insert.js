import React, { Component } from 'react';
import Header from './../../Components/Header/Header-cedulas';


import Form from './../../Components/Insert/Confronta/Confronta';

class Home extends Component{

    render(){
        return(
            <div className="MainContainer">
                <Header {...this.props} />
                <Form {...this.props} />
            </div>

        )
    }
}


Home.defaultProps = { active:'Cedula'}

export default Home
