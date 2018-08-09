import React, { Component } from 'react';
import axios from 'axios';
import Modal from './../../Modals/form';


import submit from './../../functions/submit';
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
        }
    }



    HandleCancel = (event) =>{
        event.preventDefault()
        location.href = `/SIA/juridico/${this.props.modulo}/Observaciones/${this.props.data.idVolante}`
    }

    HandleSubmit = (event) => {
        event.preventDefault();

        let form_functions = new submit()
        let data = form_functions.createDataUpdate(document.getElementsByTagName('form'),'idObservacionDoctoJuridico',this.props.data.idObservacionDoctoJuridico)
        let url = '/SIA/juridico/Observaciones/Update'

        axios.post(url,data)
        .then(response =>{
            let state_response = form_functions.resolve_request(response)
            this.setState(state_response)


        })

    }

    HandleCloseModal = () =>{

        if(this.state.modal.success){

            location.href = `/SIA/juridico/${this.props.modulo}/Observaciones/${this.props.data.idVolante}`
        } else{

            this.setState({
                modal:{visible:false}
            })
        }


    }


    render(){
        return(
        <form onSubmit={this.HandleSubmit}>
            <Formulario data={this.props.data}  cancel={this.HandleCancel}/>
            {
                this.state.modal.visible &&
                <Modal data={this.state.modal} close={this.HandleCloseModal}/>
            }

        </form>
    )
    }
}

export default Update;
