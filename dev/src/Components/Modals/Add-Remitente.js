import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import axios from 'axios';
import Modal from 'react-responsive-modal';
import './modal.styl'


class AuditoriaModal extends Component {
    
    state = {
        error:false
    }


    HandleCloseModal = () =>{
        this.props.close()
    }

    HandleSubmitRemitente = (event) =>{
        event.preventDefault();


        let tipo = document.getElementsByName('tipo')[0].value
        let saludo = document.getElementsByName('saludo')[0].value
        let nombre = document.getElementsByName('nombre')[0].value
        let puesto = document.getElementsByName('puesto')[0].value
        let siglas = document.getElementsByName('siglasArea')[0].value

        if(tipo === '' || saludo === '' || nombre === '' || puesto === '' || siglas === ''){
            this.setState({error:true})
        } else{
            
            let form = new FormData();
            form.append('tipo',tipo)
            form.append('saludo',saludo)
            form.append('nombre',nombre)
            form.append('puesto',puesto)
            form.append('siglasArea',siglas)

            let url = '/SIA/juridico/Api/Remitentes'
        
            axios.post(url,form)
            .then(response =>{
                this.props.close()
            })
        }


       
        
    }

  render(){
    return ReactDom.createPortal(
      <Modal 
        open={this.props.visible} 
        onClose={this.HandleCloseModal}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'auditoria'}}>
        
            <div >
                <div className="row">
                    <div className="col-lg-4">
                        <label>Tipo Remitente</label>
                        <select className="form-control" name="tipo" required>
                            <option value="">Escoja Opcion</option>
                            <option value="I">Interno</option>
                            <option value="E">Externo</option>
                        </select>
                    </div>
                    <div className="col-lg-2">
                        <label>Saludo</label>
                        <input type="text" required name="saludo" maxLength="15"  placeholder="saludo" className="form-control"/>
                    </div>
                    <div className="col-lg-6">
                        <label>Nombre</label>
                        <input type="text" name="nombre" maxLength="120" placeholder="Nombre" required className="form-control"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        <label>Puesto</label>
                        <input type="text" name="puesto" maxLength="120" required placeholder="Puestos" className="form-control"/>
                    </div>
                    <div className="col-lg-3">
                        <label>Siglas Area</label>
                        <input type="text" name="siglasArea" maxLength="20" required placeholder="Siglas Area"  className="form-control"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-2">
                        <button className="btn btn-primary" onClick={this.HandleSubmitRemitente}>Guardar</button>
                    </div>
                </div>
                {
                    this.state.error &&
                    <p>Faltan datos por llenar</p>
                }
            </div>
        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default AuditoriaModal;