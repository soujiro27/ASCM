import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-responsive-modal';
import axios from 'axios';
import './modal.styl'

class NotalModal extends Component {

  state =  {
    data:[],
    select:false
  }


    HandleCloseModal = () => {
        this.props.close()
    }

    HandleClick = (event) =>{
      event.preventDefault();
      let checkboxes = document.getElementsByName('textos')
      let value;
     

      for(let x = 0 ; x < checkboxes.length; x++){
        if(checkboxes[x].checked == true){
          value = checkboxes[x].value
        }
      }
      this.props.closeModalTextos(value)
    }

    componentDidMount(){
        let url = '/SIA/juridico/Api/Textos'
        axios.get(url).then(response => {
          this.setState({data:response.data,select:true})
        })
    }

    loadOptions = () => {
      let datos = this.state.data;
      let id = this.props.idTexto
      if(firmas != undefined){
          for(let y in datos){
            if(datos[y].idDocumentoTexto == id){
              datos[y].selected = true;
            }
          }
        
        return datos.map(item => {
          return (<tr key={item.idDocumentoTexto}>
            <td><input type="radio" value={item.idDocumentoTexto} name="textos" className="form-control" defaultChecked={item.selected} /></td>
            <td>{item.texto}</td>
          
          </tr>)
        })


      } else{
        return datos.map(item => {
          return (<tr key={item.idDocumentoTexto}>
            <td><input type="radio" value={item.idDocumentoTexto} name="textos" className="form-control" /></td>
            <td>{item.texto}</td>
          </tr>)
        })
      }
    }

    
  render(){
    return ReactDom.createPortal(
      <Modal
        open={true}
        onClose={this.HandleCloseModal}
        closeOnOverlayClick={false}
        center
        classNames={{'modal':'textosPromocion'}}>

        <div className="row">
          <div className="col-lg-12">
            <h4><i className="fas fa-file-alt"></i>  Seleccion Texto Promocion de Acciones</h4>
          </div>
            <div className="col-lg-12">
                <table className="table" >
                  <tbody>
                    <tr>
                      <td><strong>Seleccionar</strong></td>
                      <td><strong>Texto</strong></td>
                    </tr>
                    {
                      this.state.select &&
                      <this.loadOptions />
                    }
                  </tbody>
                </table>
            </div>
            <div className="col-lg-12">
              <button className="btn btn-primary" onClick={this.HandleClick}>Guardar Texto</button>
            </div>
        </div>
        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default NotalModal;
