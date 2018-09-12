import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom'
import Modal from 'react-responsive-modal';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './modal.styl'

class AsuntoModal extends Component {

    state ={
        contentState: {}
    }

    HandleCloseModal = () => {
        this.props.close('asunto','');
    }

    HandleClick = (event) => {
        event.preventDefault();
        
    }
    options = {
        options: ['inline', 'fontSize', 'fontFamily', 'remove', 'history']
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
          });
      };

      onContentStateChange = (contentState) => {
        this.setState({
          contentState,
        });
      };


    render(){
        console.log(this.state);
        return ReactDom.createPortal(
        <Modal
            open={true}
            onClose={this.HandleCloseModal}
            closeOnOverlayClick={false}
            center
            classNames={{'modal':'answer'}}>

            <div className="row">
                <div className="col-lg-12">
                    <h3><i className="fas fa-file-alt"></i>  Agregar Texto Asunto</h3>
                </div>
                <div className="col-lg-12">
                <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    toolbar={this.options}
                    onContentStateChange={this.onContentStateChange}
                    placeholder="Escriba Aqui El Asunto de la Cedula"
                />
                </div>
                <div className="col-lg-12">
                    <button className="btn btn-primary btn-froala" onClick={this.HandleClick}>Guardar Asunto</button>
                </div>
            </div>
            </Modal>,
        document.getElementById('modal')
        )
    }
}

export default AsuntoModal;
