import React, { Component } from 'react';
import axios from 'axios';

import Modal from './../../Modals/form'
import ModalDictamen from './../../Modals/dictamen'
import NotaModal from './../../Modals/nota'
import AuditoriaModal from './../../Modals/Auditoria';

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
        },
        modalDictamen:false,
        modalNota:false,
        modalAuditoria:false,
        formData:{
            cuenta:2016,
            nota:'NO'
        }
    }

    HandleSubmit = (event) => {
        event.preventDefault();

        let form_functions = new submit()
        let data = form_functions.createData(document.getElementsByTagName('form'))
        let url = '/SIA/juridico/Volantes/save'
        
        axios.post(url,data)
        .then(response =>{
            let state_response = form_functions.resolve_request(response)
            this.setState(state_response)
        
        })
        

    }

    HandleCancel = (event) =>{
        event.preventDefault()
        location.href = '/SIA/juridico/Volantes'
    }

    HandleCloseModal = () =>{
        
        if(this.state.modal.success){

            location.href = '/SIA/juridico/Volantes'
        } else{

            this.setState({
                modal:{visible:false}
            })
        }
    }

    HandleCloseModalDictamen = (close,cuenta) =>{
        this.setState({
            modalDictamen:false,
            form:{
                cuenta:cuenta
            }
        })
    }

    HandleCloseModalNota = (close,nota) =>{
        this.setState({
            modalNota:false,
            form:{
                nota:nota
            }
        })
    }

    HandleChangeSubDocumento = (texto) =>{
        if(texto == 'DICTAMEN'){
            this.setState({modalDictamen:true})
        } else if (texto == 'CONFRONTA'){
            this.setState({modalNota:true})
        }
    }

    HandleOpenModalAuditoria = () =>{
        this.setState({
            modalAuditoria:true
        })
    }


    render(){
        return(
            <form className="form" onSubmit={this.HandleSubmit}>
                <Formulario 
                    cancel={this.HandleCancel} 
                    documentos={this.props.data}
                    modalSubDocumento={this.HandleChangeSubDocumento}
                    formData={this.state.formData}
                    btnAuditoria={this.HandleOpenModalAuditoria}
                />
                {
                    this.state.modal.visible &&
                    <Modal data={this.state.modal} close={this.HandleCloseModal}/>
                }
                {
                    this.state.modalDictamen &&
                    <ModalDictamen 
                        close={this.HandleCloseModalDictamen} 
                        visible={this.state.modalDictamen}    
                    />
                }
                {
                    this.state.modalNota &&
                    <NotaModal 
                        close={this.HandleCloseModalNota} 
                        visible={this.state.modalNota}
                    />
                }
                {
                    this.state.modalAuditoria &&
                    <AuditoriaModal
                        close={this.HandleCloseModal}
                        visible={this.state.modalAuditoria}
                        cuenta={this.state.formData}
                    />

                }
            
            </form>

        )
    }
}

export default Insert;