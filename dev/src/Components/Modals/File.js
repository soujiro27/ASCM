import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import axios from 'axios';
import Modal from 'react-responsive-modal'
import './modal.styl'

export default class FileModal extends Component {

    HandleCloseModal = () => {
        this.props.close()
    }

    HandleSubmit = (event) => {
        event.preventDefault();

        let form = new FormData()
        form.append('file', document.getElementById('file').files[0]);
        form.append('idTurnadoJuridico',sessionStorage.getItem('turnado'));
        let url = `/SIA/juridico/${this.props.modulo}/Save`

        axios.post(url,form)
        .then(response =>{
          if(response.data.status){
            location.href = '/SIA/juridico/DocumentosGral/Update'
          }
        })
    }

  render(){
    return ReactDom.createPortal(
      <Modal
        open={true}
        onClose={this.HandleCloseModal}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'answer'}}>
            <form className="form" onSubmit={this.HandleSubmit}>
                <div className="row">
                    <div className="col-lg-12">
                        <h4><i className="far fa-file-pdf"></i>  Anexar Documento</h4>
                        <input type="file" name="file" required className="form-control" id="file"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-2">
                        <input type="submit" value="Anexar" className="btn btn-primary btn-sm" />
                    </div>
                </div>
            </form>
        </Modal>,
      document.getElementById('modal')
      )
    }
}
