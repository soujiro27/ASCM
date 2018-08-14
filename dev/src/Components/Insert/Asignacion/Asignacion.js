import React,{Component} from 'react';
import axios from 'axios';
import Formulario from './form.js';
import Modal from './../../Modals/form'
import './../../shared_styles/insert.styl'
import submit from './../../functions/submit';

export default class Asignacion extends Component {

  state = {
      "modal":{
          "visible":false,
          "message":"",
          "class":"",
          "icon":"",
          "success":false
      }
  }

  modulo = {
    nombre:localStorage.getItem('modulo')
  }



  HandleSubmit = (event) => {
    event.preventDefault();

    let form_functions = new submit()
    let data = form_functions.createData(document.getElementsByTagName('form'))
    data.append('idVolante',this.props.id)
    data.append('file', document.getElementById('file').files[0]);
    let url = `/SIA/juridico/Asignacion/Add`

    axios.post(url,data)
    .then(response =>{
        let state_response = form_functions.resolve_request(response)
        this.setState(state_response)
    })

  }

  HandleCancel = (event) => {
    event.preventDefault()
    location.href = `/SIA/juridico/${this.modulo.nombre}`
  }

  HandleCloseModal = () => {
    if(this.state.modal.success){

        location.href = `/SIA/juridico/Asignacion/${this.props.id}`
    } else{

        this.setState({
            modal:{visible:false}
        })
    }

  }


  render(){
    console.log(localStorage)
    return (<form onSubmit={this.HandleSubmit}>
      <Formulario cancel={this.HandleCancel}/>
      {
          this.state.modal.visible &&
          <Modal data={this.state.modal} close={this.HandleCloseModal}/>
      }
    </form>)
  }
}
