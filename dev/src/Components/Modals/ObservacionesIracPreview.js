import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-responsive-modal';
import './modal.styl'

class ObservacionesIrac extends Component {

  render(){

    let obvs = document.getElementById('obvs').value;
    let texto = document.getElementById('texto').value;
    let firmas = document.getElementById('firmas').value;
    let copias = document.getElementById('copias').value;
    let fecha = document.getElementById('fecha').value;
    
    return ReactDom.createPortal(
      <Modal
        open={true}
        onClose={this.props.close}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'auditoria'}}>

        <div className="row">
          <div className="col-lg-12">
            <iframe src={`/SIA/jur/App/cedulas/preview/irac_preview.php?obvs=${obvs}&copias=${copias}&texto=${texto}&firmas_e=${firmas}&fecha=${fecha}&param=${this.props.idVolante}&firmas=${this.props.firmas}`}></iframe>
          </div>
        </div>
        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default ObservacionesIrac;
