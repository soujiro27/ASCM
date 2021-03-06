import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-responsive-modal';
import './modal.styl'

class NotaGenerica extends Component {

  
    


  render(){

    let nombreRemitente = document.getElementById('nombre').value;
    let puestoRemitente = document.getElementById('puesto').value;
    let institucion = document.getElementById('institucion').value;
    let div = document.getElementsByClassName('fr-element');
    let texto = div[0].innerHTML;
    let atte = document.getElementById('atte').value
    let copias = document.getElementById('copias').value
    let siglas = document.getElementById('siglas').value
    //let ancho = document.getElementById('ancho').value


    return ReactDom.createPortal(
      <Modal
        open={true}
        onClose={this.props.close}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'auditoria'}}>

        <div className="row">
            <div className="col-lg-12">
            <iframe src={`/SIA/jur/App/cedulas/preview/nota_generico_preview.php?nombreRemitente=${nombreRemitente}&puestoRemitente=${puestoRemitente}&institucion=${institucion}&texto=${texto}&atte=${atte}&copias=${copias}&siglas=${siglas}&idVolante=${this.props.idVolante}`}></iframe>
            </div>
        </div>
        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default NotaGenerica;
