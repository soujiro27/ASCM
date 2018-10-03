import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-responsive-modal';
import './modal.styl'

class confirmVolante extends Component {

   

    HandleCloseModal = () => {
       // this.props.close('nota',this.data.nota);
    }

    validate = valor => valor.length > 0 

    render(){
        let datos = this.props.data
        console.log(datos);
        return ReactDom.createPortal(
        <Modal
            open={true}
            onClose={this.HandleCloseModal}
            closeOnOverlayClick={false}
            center
            classNames={{'modal':'auditoria'}}>

            <div className="row">
                <div className="col-lg-12">
                    <h3><i className="fab fa-wpforms"></i> Los Datos del Volante </h3>
                </div>
                <div className="col-lg-12">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Campo</td>
                                <td>Valor</td>
                                <td>Estatus</td>
                            </tr>
                            <tr>
                                <td>Documento</td>
                                <td>{datos.documento}</td>
                                <td>{this.validate(datos.documento) ? <i className="fas fa-check-circle"></i> : <i className="fas fa-times-circle"></i>}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </Modal>,
        document.getElementById('modal')
        )
    }
}

export default confirmVolante;
