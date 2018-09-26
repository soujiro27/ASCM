import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-responsive-modal';
import axios from 'axios';
import './modal.styl'

class FirmasModal extends Component {

    state =  {
      data:[]
    }

    componentDidMount(){
        let url = '/SIA/juridico/Api/Firmas'
        axios.get(url).then(response => {
          this.setState({data:response.data})
        })
    }

    HandleClick = (event) => {
      event.preventDefault()
      let checkboxes = document.getElementsByName('puestos')
        let checked = []

        checkboxes.forEach((element,index) => {
          if(element.checked == true){
            checked.push(element.value)
          }
        })

      this.props.closeModalCopias('firmas',checked)
    }


  render(){
    return ReactDom.createPortal(
      <Modal
        open={true}
        onClose={false}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'textosPromocion'}}>

        <div className="row">
            <div className="col-lg-12">
                <table className="table" >
                  <tbody>
                    <tr>
                      <td><strong>Seleccionar</strong></td>
                      <td><strong>Nombre</strong></td>
                      <td><strong>Puesto</strong></td>
                    </tr>
                      {
                        this.state.data.map(item => (
                          <tr key={item.idPuestoJuridico}>
                            <td><input type="radio" value={item.idPuestoJuridico} name="puestos" className="form-control" /></td>
                            <td>{item.saludo} {item.nombre} {item.paterno} {item.materno}</td>
                            <td>{item.puesto}</td>
                          </tr>
                        ))
                      }
                  </tbody>
                </table>
            </div>
            <div className="col-lg-12">
              <button className="btn btn-primary">Guardar</button>
            </div>
        </div>
        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default FirmasModal;
