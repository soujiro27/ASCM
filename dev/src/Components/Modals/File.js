import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import axios from 'axios';
import Modal from 'react-responsive-modal'
import './modal.styl'

export default class FileModal extends Component {
    
    HandleCloseModal = () => {
        this.props.close()
    }

    HandleSubmit = (event) => {
        event.preventDefault();

        let form = new FormData()
        form.append('file', document.getElementById('file').files[0]);
        form.append('idVolante',this.props.data[0].idVolante)
        form.append('idTurnadoJuridico',this.props.data[0].idTurnadoJuridico)
        form.append('areaRecepcion',this.props.data[0].areaRecepcion)
        let url = '/SIA/juridico/DocumentosGral/save'
        
        axios.post(url,form)
        .then(response =>{
            if(response.status == 200 ){
                this.HandleCloseModal()
            }
        
        })
    }

  render(){
     
    return ReactDom.createPortal(
      <Modal 
        open={this.props.visible} 
        onClose={this.HandleCloseModal}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'answer'}}>
            <form className="form" onSubmit={this.HandleSubmit}>
                <div className="row">
                    <div className="col-lg-12">
                        <label>Anexar Documento</label>
                        <input type="file" name="file" required className="form-control" id="file"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-2"> 
                        <input type="submit" value="Anexar" className="btn btn-primary btn-sm" />
                    </div>
                </div>
            </form>
        </Modal>,
      document.getElementById('modal')
      )
    }
}

