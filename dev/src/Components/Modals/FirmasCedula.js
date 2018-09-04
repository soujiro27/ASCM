import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-responsive-modal';
import axios from 'axios';
import './modal.styl'

class FirmasModal extends Component {

    state =  {
      data:[],
      select:false
    }

    HandleCloseModal = () => {
        let checkboxes = document.getElementsByName('puestos')
        let checked = []
        for(let x in checkboxes){
          if(checkboxes[x].checked == true){
            checked.push(checkboxes[x].value)
          }
        }
        this.props.closeModalFirmas(checked)
    }

    componentDidMount(){
        let url = '/SIA/juridico/Api/Puestos/Cedula'
        axios.get(url).then(response => {
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
            if(datos[y].idPuestoJuridico == firmasArray[x]){
              datos[y].selected = true;
            }
          }
        }


        return datos.map(item => {
          return (<tr key={item.idPuestoJuridico}>
            <td><input type="checkbox" value={item.idPuestoJuridico} name="puestos" className="form-control" defaultChecked={item.selected} /></td>
            <td>{item.saludo} {item.nombre} {item.paterno} {item.materno} </td>
            <td>{item.puesto}</td>
          </tr>)
        })


      } else{
        return datos.map(item => {
          return (<tr key={item.idPuestoJuridico}>
            <td><input type="checkbox" value={item.idPuestoJuridico} name="puestos" className="form-control" /></td>
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
        onClose={this.props.close}
        closeOnOverlayClick={false}
        center
        closeIconSvgPath={<svg aria-hidden="true" data-prefix="fas" data-icon="times-circle" className="svg-inline--fa fa-times-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>}
        classNames={{'modal':'auditoria'}}>

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
                      this.state.select &&
                      <this.loadOptions />
                    }
                  </tbody>
                </table>
            </div>
              <div className="col-lg-12">
                <button className="btn btn-primary" onClick={this.HandleCloseModal}>Guardar Firmas</button>
              </div>
        </div>
        </Modal>,
      document.getElementById('modal')
      )
    }
}

export default FirmasModal;



/*

{
  this.state.data.map(item => (
    <tr key={item.idPuestoJuridico}>
      <td><input type="checkbox" value={item.idPuestoJuridico} name="puestos" className="form-control" /></td>
      <td>{item.saludo} {item.nombre} {item.paterno} {item.materno} </td>
      <td>{item.puesto}</td>
    </tr>
  ))
}

*/
