import React, { Component } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill'
 
// import stylesheet
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import './../../shared_styles/text-editor.styl'

class Form extends Component {
    
    state = {
        subDocumentos:[],
        text:this.props.datos.texto
    }
    

    options = {
        theme: 'snow'
    }

    componentDidMount(){
        let documento = this.props.datos.idTipoDocto
        if(documento != '')
        {
            let url = '/SIA/juridico/Api/SubDocumentos'
            axios.get(url,{
                params:{
                    tipo:documento,
                    auditoria:'SI'
                }
            })
            .then((response) => {
                this.setState({
                    subDocumentos:response.data,
                })
            })
        }
        
    }

    HandleChangeSelect = (event) =>{
        let value = event.target.value
        if(value != '')
        {
            let url = '/SIA/juridico/Api/SubDocumentos'
            axios.get(url,{
                params:{
                    tipo:value,
                    auditoria:'SI'
                }
            })
            .then((response) => {
                this.setState({subDocumentos:response.data})
            })
        }
    }

    HandleTextEditor = (html) =>{
        this.setState({text:html})
    }



    render(){
       
        return(
            <div className="form-container"> 
                <div className="form-group col-lg-3">
                <label>Documento</label>
                <select className="form-control" required onChange={this.HandleChangeSelect} name="documento" defaultValue={this.props.datos.idTipoDocto}>
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
                <select className="form-control" required  name="subDocumento">
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
                    <select defaultValue={this.props.datos.estatus} className="form-control" name="estatus" required>
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="INACTIVO">INACTIVO</option>
                    </select> 
                </div>
                
                <div className="col-lg-11">
                    <ReactQuill 
                        options={this.options} 
                        onChange={this.HandleTextEditor}
                        defaultValue={this.props.datos.texto}
                        />
                    <input type="hidden" name="texto" value={this.state.text} />
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

