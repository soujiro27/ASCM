import React, { Component } from 'react';
import axios from 'axios';
import './../form.styl'
import FroalaEditor from 'react-froala-editor'

class Form extends Component {
    
    state = {
        subDocumentos:[]
    }

    ChangeSelect = (tipo) => {
        let subArray = [];
        this.props.subDocumentos.map(item => {
            if(item.idTipoDocto === tipo){
                subArray.push(item)
            }
        });
        this.setState({
            subDocumentos:subArray
        });
    }

    componentWillMount(){
        let tipo = this.props.data.idTipoDocto;
        this.ChangeSelect(tipo);
    }
    
    HandleChangeSelect = (event) =>{
        let tipo = event.target.value;
        this.ChangeSelect(tipo);
    }

    render(){
        
       let datos = this.props.data
        return(
            <div className="form-container"> 
                <div className="form-group col-lg-3">
                <label>Documento</label>
                <select className="form-control" required onChange={this.HandleChangeSelect} name="documento" defaultValue={datos.idTipoDocto}>
                    <option value="">Escoga Opcion</option>
                    {
                        this.props.documentos.map((item) =>(
                            <option key={item.idTipoDocto} value={item.idTipoDocto}>{item.nombre}</option>
                        ))
                    }
                </select>
                </div>

                <div className="form-group col-lg-3">
                <label>Sub-Documento</label>
                <select className="form-control" required  name="subDocumento"  defaultValue={datos.idSubTipoDocumento}>
                    <option value="">Escoga Opcion</option>
                    {
                        this.state.subDocumentos.map((item) =>(
                            <option key={item.idSubTipoDocumento} value={item.idSubTipoDocumento}>{item.nombre}</option>
                        ))
                    }
                </select>
                </div>

                <div className="form-group col-lg-3">
                    <label>Estatus</label>
                    <select defaultValue={datos.estatus} className="form-control" name="estatus" required>
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="INACTIVO">INACTIVO</option>
                    </select> 
                </div>
                
                <div className="col-lg-11">
                    <label>Texto Juridico</label>
                    <FroalaEditor
                        base='https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.3.4'
                        fullscreenP={true}
                        value={datos.texto}
                        listsP={true}
                        alignP={true}
                        charCounterP={true}
                        fontSizeP={true}
                        fontFamilyP={true}
                        quickInsertP={true}
                        options={{placeholderText: 'Escriba aqui la Observacion',}}
                    />
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

