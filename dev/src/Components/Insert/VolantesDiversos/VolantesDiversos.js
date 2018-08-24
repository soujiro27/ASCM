import React, { Component } from 'react';
import axios from 'axios';
import submit from './../../functions/submit';
import Formulario from './form';

import AddRemitenteModal from './../../Modals/Add-Remitente';
import RemitentesModal from './../../Modals/remitentes';

import './../../shared_styles/insert.styl'

class Insert extends Component{


  state = {
    modal:false,
    nombre:'',
    message:'',
    response:false,
  }

  formData = {
    idRemitenteJuridico:'',
    idRemitente:'',
  }


  OpenModal = () =>{
    if(this.state.nombre === 'REMITENTE'){ return <RemitentesModal  close={this.closeModalRemitente}/>}
    else if (this.state.nombre === 'REMITENTEADD') { return <NotaModal visible={true} close={this.closeModalBolean}/>}
    else if (this.state.nombre === 'ERROR') { return <ErrorForm visible={true} message={this.state.message} close={this.HandleCloseModal}/>}
    else if (this.state.nombre === 'SUCCESS') { return <SuccessForm visible={true}  close={this.HandleCloseModal}/>}
  }

  closeModalRemitente = (value) => {
    this.formData = value;
    this.setState({modal:false});
  }

  closeModalBolean = () => {
    this.setState({modal:false});
  }

  HandleOpenModal = (nombre) =>{
    this.setState({ modal:true, nombre});
  }

<<<<<<< HEAD
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
=======
>>>>>>> nuevo

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

<<<<<<< HEAD
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

=======
    render(){
>>>>>>> nuevo
        return(
            <form className="form" onSubmit={this.HandleSubmit}>
                <Formulario
                    cancel={this.HandleCancel}
<<<<<<< HEAD
                    documentos={this.props.data}
                    caracteres={this.props.caracteres}
                    areas={this.props.areas}
                    acciones={this.props.acciones}
                    formData={this.state.formData}
                    addRemitente={this.OpenModalAddRemitente}
                    remitente={this.OpenModalRemitentes}
                    dataRemitente={this.state.formData}
=======
                    openModal={this.HandleOpenModal}
                    {...this.props}
>>>>>>> nuevo
                />
                {
                  this.state.modal &&
                  <this.OpenModal />
                }

<<<<<<< HEAD
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

=======
>>>>>>> nuevo
            </form>

        )
    }
}

export default Insert;
