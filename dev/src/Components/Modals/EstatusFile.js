import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import './modal.styl'

class EstatusModal extends Component {

    state = {
      archivo:'',
      volante:'',
      estatus:''
    }

    HandleCloseModal = () => {
        this.props.close();
    }


    HandleClick = () => {
      let estatus = document.getElementsByTagName('select')[1].value
      let form = new FormData();
      form.append('id',sessionStorage.getItem('idAnexoJuridico'))
      form.append('estatus',estatus)
      axios.post('/SIA/juridico/DocumentosGral/Update',form)
      .then(response => {
          if(response.data.status){
            location.href = '/SIA/juridico/DocumentosGral/Update'
          }
      })
    }


    componentWillMount(){
      this.setState({
        archivo:sessionStorage.getItem('archivoFinal'),
        volante:sessionStorage.getItem('idVolante'),
        estatus:sessionStorage.getItem('estatus'),
      })
    }

  render(){
    console.log(this.state)
    return ReactDom.createPortal(
      <Modal
        open={true}
        onClose={this.HandleCloseModal}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'answer'}}>

        <div className="row">
          <div className="col-lg-12">
            <h4><i className="fas fa-file-pdf"></i>  Estado del Archivo Anexo</h4>
          </div>
            <table className="table">
              <tbody>
                <tr>
                  <td>Archivo</td>
                  <td>Estatus</td>
                </tr>
                <tr>
                  <td><a href={'/SIA/jur/files/' + this.state.volante + '/Areas/' + this.state.archivo} target="_blank">{this.state.archivo}</a></td>
                  <td>
                    <select defaultValue={this.state.estatus} className="form-control" >
                      <option value="ACTIVO">ACTIVO</option>
                      <option value="INACTIVO">INACTIVO</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <button className="btn btn-primary" onClick={this.HandleClick}>Guardar <i className="far fa-save"></i></button>
          </div>
        </div>
        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default EstatusModal;
