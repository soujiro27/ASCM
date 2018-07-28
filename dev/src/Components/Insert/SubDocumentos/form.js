import React, { Component } from 'react';
import './../../shared_styles/text-editor.styl'
import ToolTip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css'
class Form extends Component {
    
    state = {
        subDocumentos:[],
        text:''
    }
    

    options = {
        theme: 'snow'
    }

    render(){
        return(
            <div className="form-container"> 
                <div className="form-group col-lg-3">
                <label>Documento</label>
                <select className="form-control" required onChange={this.HandleChangeSelect} name="documento">
                    <option value="">Escoga Opcion</option>
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
                              
                        />
                    </ToolTip>
                </div>

                  <div className="form-group col-lg-3">
                    <label>Auditoria</label>
                    <ToolTip placement="right" overlay={<span>El Documento lleva Auditoria</span>}>
                    <select name="auditoria" required className="form-control">
                        <option value="">Escoga Opcion</option>
                        <option value="SI">SI</option>
                        <option value="NO">NO</option>
                    </select>
                    </ToolTip>
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

