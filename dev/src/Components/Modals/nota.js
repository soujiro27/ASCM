import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-responsive-modal';
import './modal.styl'

class NotalModal extends Component {
    
    state = {
        nota:'NO'
    }

    HandleCloseModal = () => {
        this.props.close(false,this.state.nota)
    }

    HandleChangeSelect = (event) =>{
        let value = event.target.value
        this.setState({nota:value})
    }




  render(){
    return ReactDom.createPortal(
      <Modal 
        open={this.props.visible} 
        onClose={this.HandleCloseModal}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'answer'}}>
        
        <div className="row">
            <div className="col-lg-9">
                <h3>¿El oficio contiene Nota Informativa ?</h3>
            </div>
            <div className="col-lg-3">
                <select className="form-control" defaultValue="NO" onChnage={this.HandleChangeSelect} >
                    <option value="NO">NO</option>
                    <option value="SI">SI</option>
                </select>
            </div>
        </div>
        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default NotalModal;