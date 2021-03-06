import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-responsive-modal';
import './modal.styl'

class SuccessForm extends Component {

  render(){
    return ReactDom.createPortal(
      <Modal
        open={this.props.visible}
        closeOnEsc={false}
        onClose={this.props.close}
        closeOnOverlayClick={true}
        center
        classNames={{'modal':'success'}}
        closeIconSvgPath={<svg aria-hidden="true" data-prefix="fas" data-icon="times-circle" className="svg-inline--fa fa-times-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>}
        >

        <h5>
          <i className="fas fa-check-circle"></i>
          Su Registro se ha Guardado con Exito
         </h5>

        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default SuccessForm;
