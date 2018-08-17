import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-responsive-modal';
import './modal.styl'
class FormModal extends Component {



  HandleCloseModal = () => {
    this.props.close(false)
  }

  icon = () => {
    if(this.props.data.icon){
      return (<i className="fas fa-check-circle"></i>)
    } else{
      return (<i className="fas fa-exclamation-circle"></i>)
    }
  }


  render(){
    return ReactDom.createPortal(
      <Modal
        open={this.props.data.visible} 
        onClose={this.HandleCloseModal}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':this.props.data.class}}>

        <h5>
          {this.icon()}
          {this.props.data.message}
         </h5>

        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default FormModal;
