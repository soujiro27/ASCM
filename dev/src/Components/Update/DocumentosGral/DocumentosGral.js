import React, { Component } from 'react';
import axios from 'axios';
import FileModal from './../../Modals/File'
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';
import EstatusModal from './../../Modals/EstatusFile';
import Formulario from './form';


import './../../shared_styles/insert.styl';

class Update extends Component{

  state = {
    modal:false,
    nombre:'',
    message:'',
    response:false
  }


  OpenModal = () =>{
    if (this.state.nombre === 'ERROR') { return <ErrorForm  message={this.state.message} close={this.CloseModalFile}/>}
    else if (this.state.nombre === 'SUCCESS') { return <SuccessForm   close={this.CloseModalFile} /> }
    else if (this.state.nombre === 'ESTATUS') { return <EstatusModal  close={this.CloseModalFile} /> }
    else if (this.state.nombre === 'FILE') { return <FileModal  close={this.CloseModalFile} modulo='DocumentosGral' /> }
  }

    CloseModalFile = () => {
      this.setState({modal:false})
    }


    Open = (nombre) => {
        this.setState({modal:true,nombre})
    }


    render(){
        return(
        <div className="table-documentos-container">
          <Formulario data={this.props.data} open={this.Open} />
            {
              this.state.modal &&
              <this.OpenModal />
            }
        </div>
    )
    }
}

export default Update;
