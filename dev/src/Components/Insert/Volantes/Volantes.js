import React, { Component } from 'react';
import axios from 'axios';
import submit from './../../functions/submit';
import Formulario from './form';

import Modal from './../../Modals/form'
import ModalDictamen from './../../Modals/dictamen'
import NotaModal from './../../Modals/nota'
import AuditoriaModal from './../../Modals/Auditoria';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';


import './../../shared_styles/insert.styl'

class Insert extends Component{

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
    }

    closeModalBolean = (name,value) => {
      this.formData[name] = value;
      this.setState({modal:false});
    }




    HandleSubmit = (event) => {
        event.preventDefault();
        let form_functions = new submit();
        let data = form_functions.createData_complete(document.getElementsByTagName('form'),this.formData);

        axios.post('/SIA/juridico/Volantes/Save',data)
        .then(response =>{
            let respuesta = form_functions.resolve_request(response);
            this.setState(respuesta);

        });
    }

    HandleCancel = (event) =>{
        event.preventDefault()
        location.href = '/SIA/juridico/Volantes'
    }

    HandleCloseModal = () =>{

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
    }


    render(){
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
    }
}

export default Insert;
