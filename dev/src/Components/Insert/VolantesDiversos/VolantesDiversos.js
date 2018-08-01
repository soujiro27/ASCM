import React, { Component } from 'react';
import axios from 'axios';

import Modal from './../../Modals/form'
import AddRemitenteModal from './../../Modals/Add-Remitente';
import RemitentesModal from './../../Modals/remitentes';

import './../../shared_styles/insert.styl'

import Formulario from './form';


import submit from './../../functions/submit';

class Insert extends Component{
  

    state = {
        modals:{
            addRemitente:false,
            remitente:false
        },
        formData:{
            tipoRemitente:'',
            nombre:'',
            puesto:'',
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
        let url = '/SIA/juridico/VolantesDiversos/save'
        
        axios.post(url,data)
        .then(response =>{
            let state_response = form_functions.resolve_request(response)
            console.log(state_response)
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


    OpenModalAddRemitente = () =>{
        this.setState({modals:{addRemitente:true}})
    }

    HandleCloseModalAddRemitente = () => {
        this.setState({
            modals:{addRemitente:false}
        })
    }
    
    OpenModalRemitentes = (tipo) =>{
        this.setState({
            formData:{
                tipoRemitente:tipo
            },
            modals:{
                remitente:true
            }
        })
    }


    HandleCloseModalRemitentes = (data) =>{
        this.setState({
            modals:{remitente:false},
            formData:{
                nombre:data.nombre,
                puesto:data.puesto,
                idRemitenteJuridico:data.idRemitenteJuridico,
                idRemitente:data.siglasArea,
                saludo:data.saludo
            }
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
                    formData={this.state.formData}
                    addRemitente={this.OpenModalAddRemitente}
                    remitente={this.OpenModalRemitentes}
                    dataRemitente={this.state.formData}
                />
                {
                    this.state.modal.visible &&
                    <Modal data={this.state.modal}  close={this.HandleCloseModal}/>
                }
              
                {
                    this.state.modals.addRemitente &&
                    <AddRemitenteModal visible={true} close={this.HandleCloseModalAddRemitente} />
                }
                {
                    this.state.modals.remitente &&
                    <RemitentesModal 
                        visible={true} 
                        close={this.HandleCloseModalRemitentes} 
                        tipo={this.state.formData.tipoRemitente}
                    />
                }
            
            </form>

        )
    }
}

export default Insert;