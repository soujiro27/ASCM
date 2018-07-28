import React, { Component } from 'react';
import './../../shared_styles/text-editor.styl'
import ToolTip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css'
class Form extends Component {
    
    state = {
        subDocumentos:[],
        text:''
    }
    

    render(){
        console.log(this.props)
        return(
            <div className="form-container"> 
                <div className="form-group col-lg-3">
                <label>Documento</label>
                <select className="form-control" required onChange={this.HandleChangeSelect} name="documento" defaultValue={this.props.datos.idTipoDocto}>
                    <option value="">Escoja Opcion</option>
                    {
                        this.props.documentos.map((item) =>(
                            <option key={item.idTipoDocto} value={item.idTipoDocto}>{item.nombre}</option>
                        ))
                    }
                </select>
                </div>

                <div className="form-group col-lg-3">
                    <label>Nombre</label>
                    <ToolTip placement="right" overlay={<span>Letras Mayusculas</span>}>
                        <input 
                            type="text" 
                            maxLength="50" 
                            required 
                            name="nombre" 
                            className="form-control"
                            defaultValue={this.props.datos.nombre}
                        />
                    </ToolTip>
                </div>

                  <div className="form-group col-lg-3">
                    <label>Auditoria</label>
                    <ToolTip placement="right" overlay={<span>El Documento lleva Auditoria</span>}>
                    <select name="auditoria" required className="form-control" defaultValue={this.props.datos.auditoria.toUpperCase()}>
                        <option value="">Escoja Opcion</option>
                        <option value="SI">SI</option>
                        <option value="NO">NO</option>
                    </select>
                    </ToolTip>
                </div>

                <div className="form-group col-lg-3">
                    <label>Estatus</label>
                    <select defaultValue={this.props.datos.estatus} className="form-control" name="estatus" required>
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="INACTIVO">INACTIVO</option>
                    </select> 
                </div>
                
                <div className="col-lg-4 submit-group">
                    <input type="submit" value="Guardar" className="btn btn-sm btn-primary" />
                    <button className="btn btn-danger btn-sm" onClick={this.props.cancel}>Cancelar</button>
                </div>
            </div>
            )
    }
}


export default Form;

