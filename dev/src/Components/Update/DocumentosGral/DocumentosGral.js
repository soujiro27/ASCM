import React, { Component } from 'react';
import axios from 'axios';

import FileModal from './../../Modals/File'

import Formulario from './form';

import './../../shared_styles/insert.styl';

class Update extends Component{
    
    state = {
        modals:{
            table:false,
            file:false
        },
        data:''
    }

    
    CloseModalFile = () => {
       location.href = '/SIA/juridico/DocumentosGral'
    }

    OpenModalFile = () => {
        this.setState({modals:{file:true}})
    }


    componentDidMount(){
        let url = `/SIA/juridico/DocumentosGral/Register/${this.props.id}`
        axios.get(url).then(response => {
            this.setState({
                table:true,
                data:response.data
            })
        })
    }

    render(){
        
        return(
        <div className="table-documentos-container">
            {
                this.state.table &&
                <Formulario 
                    data={this.state.data}  
                    cancel={this.HandleCancel}
                    open={this.OpenModalFile}
                />
            }
            {
                this.state.modals.file &&
                <FileModal close={this.CloseModalFile} visible={true} data={this.state.data}/>
            }
        
        </div>
    )
    }
}

export default Update;