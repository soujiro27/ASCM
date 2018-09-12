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

    HandleCloseModal = (event) => {
      event.preventDefault();
      let checkboxes = document.getElementsByName('puestos')
     
      let checked = []
      for(let x = 0; x < checkboxes.length;x++){
          
          if(checkboxes[x].checked == true){
          checked.push(checkboxes[x].value)
        }
      }

      let tipo
      this.props.tipo === 'I' ? tipo='Internos' : tipo='Externos';
      this.props.closeModalCopias(tipo,checked)
  }
  

  componentDidMount(){
        let url = '/SIA/juridico/Api/Remitentes/Tipo'
        axios.get(url,{params:{tipo:this.props.tipo}}).then(response => {
          this.setState({data:response.data,select:true})
        })
  }

  loadOptions = () => {
    let datos = this.state.data;
    let firmas = this.props.firmas
    if(firmas != undefined){
      let firmasArray = firmas.split(',')
      for(let x in firmasArray){
        for(let y in datos){
          if(datos[y].idRemitenteJuridico == firmasArray[x]){
            datos[y].selected = true;
          }
        }
      }


      return datos.map(item => {
        return (<tr key={item.idRemitenteJuridico}>
          <td><input type="checkbox" value={item.idRemitenteJuridico} name="puestos" className="form-control" defaultChecked={item.selected} /></td>
          <td>{item.saludo} {item.nombre} {item.paterno} {item.materno} </td>
          <td>{item.puesto}</td>
        </tr>)
      })


    } else{
      return datos.map(item => {
        return (<tr key={item.idRemitenteJuridico}>
          <td><input type="checkbox" value={item.idRemitenteJuridico} name="puestos" className="form-control" /></td>
          <td>{item.saludo} {item.nombre} {item.paterno} {item.materno} </td>
          <td>{item.puesto}</td>
        </tr>)
      })
    }
  }


  render(){
    return ReactDom.createPortal(
      <Modal
        open={true}
        onClose={false}
        closeOnOverlayClick={false}
        showCloseIcon={false}
        center
        classNames={{'modal':'textosPromocion'}}>

        <div className="row">
        <div className="col-lg-12">
          <h4><i className="fas fa-file-alt"></i>   Seleccionar Copias Internos</h4>
        </div>
            <div className="col-lg-12">
                <table className="table" >
                  <tbody>
                    <tr>
                      <td><strong>Seleccionar</strong></td>
                      <td><strong>Nombre</strong></td>
                      <td><strong>Puesto</strong></td>
                    </tr>
                    {
                      this.state.select &&
                      <this.loadOptions />
                    }
                  </tbody>
                </table>
            </div>
           <div className="col-lg-12">
              <button className="btn btn-primary" onClick={this.HandleCloseModal}>Guardar</button>
           </div> 
        </div>
        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default NotalModal;
