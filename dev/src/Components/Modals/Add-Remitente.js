import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import axios from 'axios';
import Modal from 'react-responsive-modal';
import './modal.styl'


class AuditoriaModal extends Component {


    state = { error:false }

    HandleCloseModal = () =>{
        this.props.close()
    }

    HandleSubmitRemitente = (event) => {
      event.preventDefault();
      let form = new FormData();

      let inputs = ['tipo','saludo','nombre','puesto','siglasArea'];
      for(let x in inputs){
        let value = document.getElementsByName(inputs[x])[0].value
        form.append(inputs[x],value)
      }

      axios.post('/SIA/juridico/Api/Remitentes',form)
      .then(response => {
          if(!response.data.estatus){
            this.setState({error:true})
          } else {
            this.props.close()
          }
      });

  }

  render(){
    return ReactDom.createPortal(
      <Modal
        open={true}
        onClose={this.HandleCloseModal}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'auditoria'}}>

            <div id="add-remitente">
              <div className="row">
                <div className="col-lg-12">
                  <h3><i className="fas fa-users"></i>  Agregar Remitente Nuevo</h3>
                </div>
              </div>
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
                    <div className="col-lg-9">
                        <label>Puesto</label>
                        <input type="text" name="puesto" maxLength="120" required placeholder="Puestos" className="form-control"/>
                    </div>
                    <div className="col-lg-3">
                        <label>Siglas Area</label>
                        <input type="text" name="siglasArea" maxLength="20" required placeholder="Siglas Area"  className="form-control"/>
                    </div>
                </div>
                <div className="row submit-group">
                    <div className="col-lg-2">
                        <button className="btn btn-primary" onClick={this.HandleSubmitRemitente}>Guardar</button>
                    </div>
                    <div className="col-lg-6">
                      {this.state.error && <p id="error-text"><i className="fas fa-exclamation-circle"></i>  No puede Haber campos Vacios</p>}
                    </div>
                </div>
            </div>
        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default AuditoriaModal;
