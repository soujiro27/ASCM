import React, { Component } from 'react';
import Header from './../../Components/Header/Header-text';
import Table from '../../Components/Tablas/Container/Internos/Irac';
class Home extends Component{

    render(){
        return(
            <div className="MainContainer">
                <Header texto={this.props.texto} />
                <Table {...this.props} />
            </div>

        )
    }
}

Home.defaultProps = { texto:'Irac' };
export default Home
