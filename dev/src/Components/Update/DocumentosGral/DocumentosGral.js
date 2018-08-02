import React, { Component } from 'react';

import Modal from './../../Modals/form';
import FileModal from './../../Modals/File'

import Formulario from './form';

import './../../shared_styles/insert.styl';

class Update extends Component{
    
    state = {
        "modal":{
            "visible":false,
            "message":"",
            "class":"",
            "icon":"",
            "success":false
        },
        anexoModal:this.props.openModalAnexo
    }



    HandleCloseModal = () =>{
        
        if(this.state.modal.success){

            location.href = '/SIA/juridico/DocumentosGral'
        } else{

            this.setState({
                modal:{visible:false}
            })
        }
        
    
    }
    
    CloseModalFile = () => {
        this.props.CloseModalAnexo()
    }


    render(){
       
        return(
        <div className="table-documentos-container">
            <Formulario data={this.props.data}  cancel={this.HandleCancel}/>
            {
                this.state.modal.visible &&
                <Modal data={this.state.modal} close={this.HandleCloseModal}/>
            }
            {
                this.props.openModalAnexo &&
                <FileModal close={this.CloseModalFile} visible={true} data={this.props.data}/>
            }
        
        </div>
    )
    }
}

export default Update;