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
        modals:{
            dictamen:false,
            nota:false,
            auditoria:false
        },
        formData:{
            cuenta:'2016',
            nota:'NO',
            cveAuditoria:'',
            idRemitente:''
        },
        modal:{
            visible:false,
            message:"",
            class:"",
            icon:"",
            success:false
        }
        
    }

    HandleSubmit = (event) => {
        event.preventDefault();

        let form_functions = new submit()
        let data = form_functions.createData(document.getElementsByTagName('form'))
        data.append('file', document.getElementById('file').files[0]);
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

    HandleCloseModalDictamen = (cuenta) =>{
        this.setState({modals:{
            dictamen:false
            },
            formData:{cuenta}
        })
    }

    HandleCloseModalNota = (nota) =>{
        this.setState({
            modals:{nota:false},
            formData:{
                nota,
                cuenta:'2016'
            }
        })
    }

    HandleChangeSubDocumento = (texto) =>{
        if(texto == 'DICTAMEN'){
            this.setState({modals:{dictamen:true}})
        } else if (texto == 'CONFRONTA'){
            this.setState({modals:{nota:true}})
        }
    }

    HandleOpenModalAuditoria = () =>{
        this.setState({
            modals:{auditoria:true}
        })
    }

    HandleCloseModalAuditoria = (idRemitente,cveAuditoria,cuenta) =>{
        
        this.setState({
            modals:{auditoria:false},
            formData:{cveAuditoria,idRemitente,cuenta}
        })
    }


    render(){
        
        return(
            <form className="form" onSubmit={this.HandleSubmit}>
                <Formulario 
                    cancel={this.HandleCancel} 
                    documentos={this.props.data}
                    caracteres={this.props.caracteres}
                    areas={this.props.areas}
                    acciones={this.props.acciones}
                    modalSubDocumento={this.HandleChangeSubDocumento}
                    formData={this.state.formData}
                    btnAuditoria={this.HandleOpenModalAuditoria}
                />
                {
                    this.state.modal.visible &&
                    <Modal data={this.state.modal}  close={this.HandleCloseModal}/>
                }
                {
                    this.state.modals.dictamen &&
                    <ModalDictamen 
                        close={this.HandleCloseModalDictamen} 
                        visible={true}    
                    />
                }
                {
                    this.state.modals.nota &&
                    <NotaModal 
                        close={this.HandleCloseModalNota} 
                        visible={true}
                    />
                }
                {
                    this.state.modals.auditoria &&
                    <AuditoriaModal
                        close={this.HandleCloseModalAuditoria}
                        visible={true}
                        cuenta={this.state.formData}
                    />

                }
            
            </form>

        )
    }
}

export default Insert;