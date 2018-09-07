import React, { Component } from 'react';
import axios from 'axios';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';
import './../../shared_styles/insert.styl'
import Formulario from './form';
import submit from './../../functions/submit';

class Insert extends Component {

    state = {
        modal:false,
        nombre:'',
        message:'',
        response:false
    }
    formData = {
        texto:this.props.data.texto
    }

    OpenModal = () => {
        if (this.state.nombre === 'ERROR') { return <ErrorForm visible={true} message={this.state.message} close={this.HandleCloseModal}/>}
        else if (this.state.nombre === 'SUCCESS') { return <SuccessForm visible={true}  close={this.HandleCloseModal}/>}
    }

    HandleCancel = (event) => {
        event.preventDefault()
        location.href = '/SIA/juridico/DoctosTextos'
    }

    HandleCloseModal = () => {
        this.state.response ? location.href = '/SIA/juridico/DoctosTextos' : this.setState({modal:false});
    }

    HandleSubmit = (event) => {
        event.preventDefault();
  
        let div = document.getElementsByClassName('fr-element');
        let html = div[0].innerHTML;
        this.formData['texto'] = html;
  
        let form_functions = new submit()
        let data = form_functions.createDataUpdateFormData(document.getElementsByTagName('form'),'idDocumentoTexto',this.props.data.idDocumentoTexto,this.formData)
        data.append('texto',html)
        let url = '/SIA/juridico/Textos/Update'
  
        axios.post(url,data)
        .then(response =>{
          let respuesta = form_functions.resolve_request(response);
          this.setState(respuesta);
        })
      }


    render(){
        console.log(this.props)
        return(
            <form className="form" onSubmit={this.HandleSubmit}>
                <Formulario cancel={this.HandleCancel} {...this.props}/>
                {
                this.state.modal &&
                <this.OpenModal />
                }
            </form>

        )
    }
}

export default Insert;
