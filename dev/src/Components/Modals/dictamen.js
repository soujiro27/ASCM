import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-responsive-modal';
import './modal.styl'

class DictamenModal extends Component {

    state = {
        cuenta:2016
    }

    HandleCloseModal = () => {
        this.props.close(this.state.cuenta)
    }

    HandleChangeSelect = (event) =>{
        let value = event.target.value
        this.setState({cuenta:value})
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
            <div className="col-lg-7">
                <h3><i className="fas fa-archive"></i> Seleccione Cuenta Publica</h3>
            </div>
            <div className="col-lg-4">
                <select className="form-control" defaultValue="2016" onChange={this.HandleChangeSelect} >
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                </select>
            </div>
        </div>
        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default DictamenModal;
