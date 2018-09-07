import React, { Component } from 'react';
import axios from 'axios';
import FroalaEditor from 'react-froala-editor'
import './../form.styl'

class Form extends Component {
    
    state = {
        subDocumentos:[],
    }
    
    HandleChangeSelect = (event) =>{
        let tipo = event.target.value;
        let subArray = [];
        this.props.subDocumentos.map(item => {
            if(item.idTipoDocto === tipo){
                subArray.push(item)
            }
        })

        document.getElementById('subDocumento').removeAttribute('disabled')
        this.setState({
            subDocumentos:subArray
        })
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
                <label>Sub-Documento</label>
                <select className="form-control" required  name="subDocumento" disabled id="subDocumento">
                    <option value="">Escoga Opcion</option>
                    {
                        this.state.subDocumentos.map((item) =>(
                            <option key={item.idSubTipoDocumento} value={item.idSubTipoDocumento}>{item.nombre}</option>
                        ))
                    }
                </select>
                </div>
                
                <div className="col-lg-11">
                    <label>Texto Juridico</label>      
                    <FroalaEditor
                    base='https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.3.4'
                    fullscreenP={true}
                    listsP={true}
                    alignP={true}
                    charCounterP={true}
                    fontSizeP={true}
                    fontFamilyP={true}
                    quickInsertP={true}       
                    options={{placeholderText: 'Escriba aqui el texto',}}
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

