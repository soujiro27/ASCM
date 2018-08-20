import React, { Component } from 'react';
import axios from 'axios';

import Formulario from './form';
import submit from './../../functions/submit';

import Modal from './../../Modals/form'
import ModalError from './../../Modals/ErrorForm'
import ModalDictamen from './../../Modals/dictamen'
import NotaModal from './../../Modals/nota'
import AuditoriaModal from './../../Modals/Auditoria';

import './../../shared_styles/insert.styl'

class Insert extends Component{


    state = {
        modals:{
          DICTAMEN:false,
          CONFRONTA:false,
          AUDITORIA:false,
          FORM:false,
          formModal:{
            message:'',
            success:false
          },
          numero_auditoria:''
        }
    }


    formData = {
      cuenta:'2016',
      nota:'NO',
      cveAuditoria:'',
      idRemitente:''
    }


    ModalForm = () =>{
      if(this.state.formModal.success){
        return <Modal />
      } else{
        return <ModalError message={this.state.formModal.message} close={this.HandleCloseModal}/>
      }
    }

    HandleSubmit = (event) => {
        event.preventDefault();

        let form_functions = new submit()
        let data = form_functions.createData(document.getElementsByTagName('form'))
        let formData = form_functions.appendFormData(this.formData,data)
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

        if(this.state.formModal.success){

            location.href = '/SIA/juridico/Volantes';
        } else{

            this.setState({FORM:false});
        }
    }

    HandleCloseModalDictamen = (cuenta) =>{
        this.formData['cuenta'] = cuenta;
        this.setState({modals:{['DICTAMEN']:false}});
    }

    HandleCloseModalNota = (nota) =>{
      this.formData['cuenta'] = '2016';
      this.formData['nota'] = nota;
      this.setState({modals:{['CONFRONTA']:false}});
    }

    HandleOpenModal = (texto) =>{
        this.setState({modals:{[texto]:true}});
    }


    HandleCloseModalAuditoria = (idRemitente,cveAuditoria,clave) =>{
      this.formData['idRemitente'] = idRemitente;
      this.formData['cveAuditoria'] = cveAuditoria;
      this.setState({
        modals:{['FORM']:false},
        numero_auditoria:clave
      });
    }



    render(){
      return(
          <form className="form" onSubmit={this.HandleSubmit}>
              <Formulario
                  cancel={this.HandleCancel}
                  openModal={this.HandleOpenModal}
                  formData={this.state.formData}
                  {...this.props}
                  numeroAuditoria={this.state.numero_auditoria}
              />
              {
                  this.state.FORM &&
                  <this.ModalForm />
              }
              {
                  this.state.modals.DICTAMEN &&
                  <ModalDictamen
                      close={this.HandleCloseModalDictamen}
                      visible={true}
                  />
              }
              {
                  this.state.modals.CONFRONTA &&
                  <NotaModal
                      close={this.HandleCloseModalNota}
                      visible={true}
                  />
              }
              {
                  this.state.modals.AUDITORIA &&
                  <AuditoriaModal
                      close={this.HandleCloseModalAuditoria}
                      visible={true}
                      cuenta={this.formData.cuenta}
                  />

              }

          </form>

      )
    }
}

export default Insert;
