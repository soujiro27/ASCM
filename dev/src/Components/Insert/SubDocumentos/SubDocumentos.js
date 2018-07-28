import React, { Component } from 'react';
import axios from 'axios';

import Modal from './../../Modals/form'

import './../../shared_styles/insert.styl'

import Formulario from './form';

import submit from './../../functions/submit';

class Insert extends Component{
    
    state = {
        "modal":{
            "visible":false,
            "message":"",
            "class":"",
            "icon":"",
            "success":false
        }
    }

    HandleSubmit = (event) => {
        event.preventDefault();

        let form_functions = new submit()
        let data = form_functions.createData(document.getElementsByTagName('form'))
        let url = '/SIA/juridico/SubTiposDocumentos/save'
        
        axios.post(url,data)
        .then(response =>{
            let state_response = form_functions.resolve_request(response)
            this.setState(state_response)
        
        })
        

    }

    HandleCancel = (event) =>{
        event.preventDefault()
        location.href = '/SIA/juridico/SubTiposDocumentos'
    }

    HandleCloseModal = () =>{
        
        if(this.state.modal.success){

            location.href = '/SIA/juridico/SubTiposDocumentos'
        } else{

            this.setState({
                modal:{visible:false}
            })
        }
        
    
    }


    render(){
        return(
            <form className="form" onSubmit={this.HandleSubmit}>
                <Formulario cancel={this.HandleCancel} documentos={this.props.data}/>
                {
                    this.state.modal.visible &&
                    <Modal data={this.state.modal} close={this.HandleCloseModal}/>
                }
            
            </form>

        )
    }
}

export default Insert;