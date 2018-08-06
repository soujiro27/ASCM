import React, { Component } from 'react';
import axios from 'axios';

import Modal from './../../Modals/form'
import RemitentesModal from './../../Modals/remitentes';

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
        formData:{
            tipoRemitente:'',
            nombre:this.props.data[0].saludoRemitente + this.props.data[0].nombreRemitente,
            puesto:this.props.data[0].puestoRemitente,
            idRemitente:this.props.data[0].idRemitente,
            idRemitenteJuridico:this.props.data[0].idRemitenteJuridico,
        },
        modals:{
            remitente:false
        }

    }

    HandleSubmit = (event) => {
        event.preventDefault();
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
        console.log(this.props.data)
        return(
            <form className="form" onSubmit={this.HandleSubmit}>
                <Formulario 
                    cancel={this.HandleCancel}   
                    datos={this.props.data}
                    caracteres={this.props.caracteres}
                    areas={this.props.areas}
                    acciones={this.props.acciones}
                    remitente={this.OpenModalRemitentes}
                    dataRemitente={this.state.formData}
                    />
                {
                    this.state.modal.visible &&
                    <Modal data={this.state.modal} close={this.HandleCloseModal}/>
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