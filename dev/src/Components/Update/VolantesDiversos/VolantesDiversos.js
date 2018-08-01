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
        console.log(this.props)
        let form_functions = new submit()
        let data = form_functions.createDataUpdate(document.getElementsByTagName('form'),'idVolante',this.props.data[0].idVolante)
        let url = '/SIA/juridico/VolantesDiversos/Update'
        
        axios.post(url,data)
        .then(response =>{
            let state_response = form_functions.resolve_request(response)
            this.setState(state_response)
        
        })
        

    }

    HandleCancel = (event) =>{
        event.preventDefault()
        location.href = '/SIA/juridico/VolantesDiversos'
    }

    HandleCloseModal = () =>{
        
        if(this.state.modal.success){

            location.href = '/SIA/juridico/VolantesDiversos'
        } else{

            this.setState({
                modal:{visible:false}
            })
        }
        
    
    }


    render(){
        return(
            <form className="form" onSubmit={this.HandleSubmit}>
                <Formulario 
                    cancel={this.HandleCancel}   
                    datos={this.props.data}
                    caracteres={this.props.caracteres}
                    areas={this.props.areas}
                    acciones={this.props.acciones}
                    />
                {
                    this.state.modal.visible &&
                    <Modal data={this.state.modal} close={this.HandleCloseModal}/>
                }
            
            </form>

        )
    }
}

export default Insert;