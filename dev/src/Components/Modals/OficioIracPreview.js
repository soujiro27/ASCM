import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-responsive-modal';
import './modal.styl'

class OficioIracModal extends Component {

  
    


  render(){

    let atte = document.getElementById('atte').value;
    let copias = document.getElementById('e_copias').value;
    let siglas = document.getElementById('siglas').value;
    
    return ReactDom.createPortal(
      <Modal
        open={true}
        onClose={this.props.close}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'auditoria'}}>

        <div className="row">
            <div className="col-lg-12">
            <iframe src={`/SIA/jur/App/cedulas/preview/oficio_irac_preview.php?atte=${atte}&copias=${copias}&siglas=${siglas}`}></iframe>
            </div>
        </div>
        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default OficioIracModal;
