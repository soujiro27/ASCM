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
        let data = form_functions.createDataUpdate(document.getElementsByTagName('form'),'idDocumentoTexto',this.props.data.idDocumentoTexto)
        let url = '/SIA/juridico/Textos/Update'

        axios.post(url,data)
        .then(response =>{
            let state_response = form_functions.resolve_request(response)
            this.setState(state_response)

        })


    }

    HandleCancel = (event) =>{
        event.preventDefault()
        location.href = '/SIA/juridico/DoctosTextos'
    }

    HandleCloseModal = () =>{

        if(this.state.modal.success){

            location.href = '/SIA/juridico/DoctosTextos'
        } else{

            this.setState({
                modal:{visible:false}
            })
        }


    }


    render(){
        return(
            <form className="form" onSubmit={this.HandleSubmit}>
                <Formulario cancel={this.HandleCancel} {...this.props}/>
                {
                    this.state.modal.visible &&
                    <Modal data={this.state.modal} close={this.HandleCloseModal}/>
                }

            </form>

        )
    }
}

export default Insert;
