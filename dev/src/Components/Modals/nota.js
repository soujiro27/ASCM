import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-responsive-modal';
import './modal.styl'

class NotalModal extends Component {

    data = {
        nota:'NO'
    }

    HandleCloseModal = () => {
        this.props.close('nota',this.data.nota);
    }

    HandleChangeSelect = (event) =>{
        let value = event.target.value;
        this.data['nota'] = value;
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
                <h3><i className="fas fa-question-circle"></i> ¿El oficio contiene Nota Informativa ?</h3>
            </div>
            <div className="col-lg-3">
                <select className="form-control" defaultValue="NO" onChange={this.HandleChangeSelect} >
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
