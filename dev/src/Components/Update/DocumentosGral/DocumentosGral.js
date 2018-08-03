import React, { Component } from 'react';

import FileModal from './../../Modals/File'

import Formulario from './form';

import './../../shared_styles/insert.styl';

class Update extends Component{
    
    state = {
        anexoModal:this.props.openModalAnexo
    }

    
    CloseModalFile = () => {
        this.props.CloseModalAnexo()
    }


    render(){
       
        return(
        <div className="table-documentos-container">
            <Formulario data={this.props.data}  cancel={this.HandleCancel}/>
            {
                this.props.openModalAnexo &&
                <FileModal close={this.CloseModalFile} visible={true} data={this.props.data}/>
            }
        
        </div>
    )
    }
}

export default Update;