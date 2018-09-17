import React,{Component} from 'react';
import axios from 'axios';
import Formulario from './form.js';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';
import ConfrontaPreview from './../../Modals/CedulaCronfrontaPreview';

import './../../shared_styles/insert.styl'
import submit from './../../functions/submit';

export default class Asignacion extends Component {

    state = {
        modal:false,
        nombre:'',
        message:'',
        response:false
    }
    formData = {
        idVolante:this.props.data[0].idVolante
    }

    OpenModal = () => {
        if (this.state.nombre === 'ERROR') { return <ErrorForm visible={true} message={this.state.message} close={this.HandleCloseModal}/>}
        else if (this.state.nombre === 'SUCCESS') { return <SuccessForm visible={true}  close={this.HandleCloseModal}/>}
        else if (this.state.nombre === 'PREVIEW') { return <ConfrontaPreview   close={this.CloseModal}/>}
    }

  
    HandleCancel = (event) => {
        event.preventDefault()
        location.href = '/SIA/juridico/confrontasJuridico'
    }

    HandleCloseModal = () =>{
        if(this.state.response){
            window.open('/SIA/jur/App/cedulas/CONFRONTA.php?param='+this.props.data[0].idVolante);
        } 
        this.setState({modal:false});
    }
    
    CloseModal = () =>{
        this.setState({modal:false});
    }

    HandleSubmit = (event) => {
        event.preventDefault();
  
        let form_functions = new submit()
        let data = form_functions.createDataUpdateFormData(document.getElementsByTagName('form'),'idConfrontaJuridico',this.props.data[0].idConfrontaJuridico,this.formData)
        let url = '/SIA/juridico/Confronta/Update'
  
        axios.post(url,data)
        .then(response =>{
          let respuesta = form_functions.resolve_request(response);
          this.setState(respuesta);
        }); 
    }

    prev = (event) => {
        event.preventDefault();
        this.setState({modal:true,nombre:'PREVIEW'});
    }
    print = (event) =>{
        event.preventDefault();
        window.open('/SIA/jur/App/cedulas/CONFRONTA.php?param='+this.props.data[0].idVolante);
    }

    render(){
        console.log(this.props)
        return (
            <div className="cedula-container row">
                <form onSubmit={this.HandleSubmit} className="col-lg-12">
                    <Formulario
                        data={this.props.data[0]}
                        cancel={this.HandleCancel}
                        prev={this.prev}
                        print={this.print}
        
                    />
                    {
                        this.state.modal &&
                        <this.OpenModal />
                    }
                </form>
               
            </div>
        )
    }
}
