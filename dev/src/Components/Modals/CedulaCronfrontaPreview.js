import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-responsive-modal';
import './modal.styl'

class ConfrontaModal extends Component {

  
    


  render(){

    let siglas = document.getElementById('e_siglas').value;
    
    return ReactDom.createPortal(
      <Modal
        open={true}
        onClose={this.props.close}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'auditoria'}}>

        <div className="row">
            <div className="col-lg-12">
            <iframe src={`/SIA/jur/App/cedulas/preview/confronta_preview.php?siglas=${siglas}`}></iframe>
            </div>
        </div>
        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default ConfrontaModal;
