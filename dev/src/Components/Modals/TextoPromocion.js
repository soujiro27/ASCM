import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-responsive-modal';
import axios from 'axios';
import './modal.styl'

class NotalModal extends Component {

    state =  {
      data:[]
    }

    HandleCloseModal = () => {
        let checkboxes = document.getElementsByName('textos')
        let checked = []

        checkboxes.forEach((element,index) => {
          if(element.checked == true){
            checked.push(element.value)
          }
        })

      this.props.close(checked)
    }

    HandleChangeSelect = (event) =>{
        let value = event.target.value
        this.setState({nota:value})
    }

    componentDidMount(){
        let url = '/SIA/juridico/Api/Textos'
        axios.get(url).then(response => {
          this.setState({data:response.data})
        })
    }
    
  render(){
    return ReactDom.createPortal(
      <Modal
        open={this.props.visible}
        onClose={this.HandleCloseModal}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'textosPromocion'}}>

        <div className="row">
            <div className="col-lg-12">
                <table className="table" >
                  <tbody>
                    <tr>
                      <td><strong>Seleccionar</strong></td>
                      <td><strong>Texto</strong></td>
                    </tr>
                      {
                        this.state.data.map(item => (
                          <tr key={item.idDocumentoTexto}>
                            <td><input type="radio" value={item.idDocumentoTexto} name="textos" className="form-control" /></td>
                            <td>{item.texto}</td>
                          </tr>
                        ))
                      }
                  </tbody>
                </table>
            </div>
        </div>
        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default NotalModal;
