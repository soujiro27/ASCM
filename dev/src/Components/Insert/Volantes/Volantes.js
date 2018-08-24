import React, { Component } from 'react';
import axios from 'axios';
import submit from './../../functions/submit';
import Formulario from './form';

import Formulario from './form';
import submit from './../../functions/submit';

import Modal from './../../Modals/form'
import ModalError from './../../Modals/ErrorForm'
import ModalDictamen from './../../Modals/dictamen'
import NotaModal from './../../Modals/nota'
import AuditoriaModal from './../../Modals/Auditoria';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';


import './../../shared_styles/insert.styl'

class Insert extends Component{

<<<<<<< HEAD

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
=======
    state = {
      modal:false,
      nombre:'',
      auditoria:'No Ha Seleccionado Auditoria',
      message:'',
      response:false
    }

    formData = {
      cuenta:'2016',
      nota:'NO',
      cveAuditoria:'',
      idRemitente:''
    }



    OpenModal = () =>{
      if(this.state.nombre === 'DICTAMEN'){ return <ModalDictamen visible={true} close={this.closeModalBolean}/>}
      else if (this.state.nombre === 'CONFRONTA') { return <NotaModal visible={true} close={this.closeModalBolean}/>}
      else if(this.state.nombre === 'AUDITORIA'){ return <AuditoriaModal visible={true} cuenta={this.formData.cuenta}  close={this.HandleCloseModalAuditoria} />}
      else if (this.state.nombre === 'ERROR') { return <ErrorForm visible={true} message={this.state.message} close={this.HandleCloseModal}/>}
      else if (this.state.nombre === 'SUCCESS') { return <SuccessForm visible={true}  close={this.HandleCloseModal}/>}
>>>>>>> nuevo
    }

    closeModalBolean = (name,value) => {
      this.formData[name] = value;
      this.setState({modal:false});
    }




    HandleSubmit = (event) => {
        event.preventDefault();
        let form_functions = new submit();
        let data = form_functions.createData_complete(document.getElementsByTagName('form'),this.formData);

<<<<<<< HEAD
        let form_functions = new submit()
        let data = form_functions.createData(document.getElementsByTagName('form'))
        let formData = form_functions.appendFormData(this.formData,data)
        let url = '/SIA/juridico/Volantes/save'


        axios.post(url,data)
        .then(response =>{
            let state_response = form_functions.resolve_request(response)
            this.setState(state_response)

        })
=======
        axios.post('/SIA/juridico/Volantes/Save',data)
        .then(response =>{
            let respuesta = form_functions.resolve_request(response);
            this.setState(respuesta);

        });
>>>>>>> nuevo
    }

    HandleCancel = (event) =>{
        event.preventDefault()
        location.href = '/SIA/juridico/Volantes'
    }

    HandleCloseModal = () =>{

<<<<<<< HEAD
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
=======
      this.state.response ? location.href = '/SIA/juridico/Volantes' : this.setState({modal:false})

    }

    HandleOpenModal = (nombre) =>{
      if(nombre  === 'DICTAMEN' ||  nombre === 'CONFRONTA' || nombre === 'AUDITORIA'){
        this.setState({ modal:true, nombre});
      }
    }

    HandleCloseModalAuditoria = (idRemitente,cveAuditoria,auditoria) =>{
        this.formData['idRemitente'] = idRemitente;
        this.formData['cveAuditoria'] = cveAuditoria;
        this.setState({modal:false,auditoria});
>>>>>>> nuevo
    }



    render(){
<<<<<<< HEAD
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
=======
        return(
            <form className="form" onSubmit={this.HandleSubmit}>
                <Formulario
                    cancel={this.HandleCancel}
                    modalSubDocumento={this.HandleOpenModal}
                    formData={this.state.formData}
                    btnAuditoria={this.HandleOpenModal}
                    auditoria={this.state.auditoria}
                    {...this.props}
                />
              {
                this.state.modal &&
                <this.OpenModal />
              }
            </form>

        )
>>>>>>> nuevo
    }
}

export default Insert;
