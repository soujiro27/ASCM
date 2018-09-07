import React,{Component} from 'react';
import axios from 'axios';
import Formulario from './form.js';
import ErrorForm from './../../Modals/ErrorForm';
import SuccessForm from './../../Modals/SucessForm';
import './../../shared_styles/insert.styl'
import submit from './../../functions/submit';

export default class Asignacion extends Component {

    state = {
        modal:false,
        nombre:'',
        message:'',
        response:false,
    }

    formData = {
        idVolante:this.props.idVolante
    }

    OpenModal = () =>{
        if (this.state.nombre === 'ERROR') { return <ErrorForm visible={true} message={this.state.message} close={this.HandleCloseModal}/>}
        else if (this.state.nombre === 'SUCCESS') { return <SuccessForm visible={true}  close={this.HandleCloseModal}/>}
      }

    HandleCancel = (event) => {
    event.preventDefault()
    location.href = '/SIA/juridico/confrontasJuridico'
    }

    
    HandleCloseModal = () =>{
        if(this.state.response){
           
            window.open('/SIA/jur/App/cedulas/CONFRONTA.php?param='+this.props.idVolante);
            location.href = '/SIA/juridico/confrontasJuridico';
        } else {
            this.setState({modal:false})
        }
    }

    HandleSubmit = (event) => {
        event.preventDefault();
    
        let form_functions = new submit()
        let data = form_functions.createData_complete(document.getElementsByTagName('form'),this.formData)
        let url = '/SIA/juridico/Confronta/Save'
    
        axios.post(url,data)
        .then(response =>{
          let respuesta = form_functions.resolve_request(response);
          this.setState(respuesta);
        })
    
    }

    prev = (event) => {
        event.preventDefault();
        let siglas = document.getElementById('e_siglas').value;
        document.getElementById('prev-cedula').innerHTML = (`<iframe src="/SIA/jur/App/cedulas/preview/confronta_preview.php?siglas=${siglas}"></iframe>`)
    }

  render(){

    return (
    <div className="cedula-container row">
        <form onSubmit={this.HandleSubmit} className="col-lg-7">
            <Formulario
                cancel={this.HandleCancel}
                prev={this.prev}
                {...this.props}
            />
            {
                this.state.modal &&
                <this.OpenModal />
            }
        </form>
        <div className="col-lg-5 prev-cedula" id="prev-cedula">
          <h2><i className="fas fa-file-pdf"></i></h2>
          <h4>Inserte los datos y presione el boton de Previsualizar para ver una vista previa de la cedula</h4>
        </div>
    </div>
    )
  }
}
