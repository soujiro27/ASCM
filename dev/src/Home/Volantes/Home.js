
import React,{Component} from 'react';
import Header from './../../Components/Header/Header-add-volantes';
import Table from '../../Components/Tablas/Container/Volantes/Volantes';


export default class Home extends Component {

 

  state = {
    year : this.props.year
  }

  
  HandleYear = (year) => {
    this.setState({year});
  }

  render(){
    
    return(
      <div className="MainContainer">
          <Header {...this.props} now={this.state.year} year={this.HandleYear}/>
          <Table year={this.state.year} modulo={this.props.modulo}/>
      </div>
    )
  }

}



