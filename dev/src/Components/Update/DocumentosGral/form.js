import React,{Component} from 'react';
import Switch from "react-switch";
import axios from 'axios'
import './../form.styl'

export default class UpdateDocumento extends Component {

    state = {
        load:false,
        data:this.props.data,
        checked:[]
    }

    handleChange = (checked,event) => {
        if(event.target.children.length > 0){
            
            let estatus
            checked ? estatus = 'ACTIVO' : estatus = 'INACTIVO'
            let position = event.target.parentNode.parentNode.getAttribute('data-id')
            let idAnexoJuridico = event.target.parentNode.parentNode.getAttribute('data-idanexo')
            let valores = this.state.checked
            valores[position] = checked
            
            let form = new FormData();
            
            form.append('id',idAnexoJuridico)
            form.append('estatus',estatus)
            form.append('idAnexoTurnado',this.props.data)
            axios.post('/SIA/juridico/DocumentosGral/Update',form)
            .then((response)=>{
                if(response.status == 200){
                    this.setState({
                        checked:valores
                    })
                }
            })
        }
    }


    componentWillMount(){
        if(this.props.data[0].idAnexoJuridico !== 'undefined'){

        
            let datos = {}
            for(let x in this.props.data){
                let valor
                this.props.data[x].estatus == 'ACTIVO' ? valor = true : valor = false
                datos[x] = valor
            }

            this.setState({
                checked:datos
            })
        }
    }

    checkedIcon =
      <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 13,
                color: "white",
                paddingLeft: 24
            }}>
                ACTIVO
            </div>
    
    uncheckedIcon = <div
        style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 13,
        color: "white",
        paddingRight: 24
        }}
    >
        INACTIVO
    </div>

    TablaDocumentos = () => {

        
        if(this.props.data[0].idAnexoJuridico !== undefined )
        {
            return this.props.data.map((element,index) => {

                return(
                    <tr key={element.idAnexoJuridico}>
                        <td>{element.areaRemitente}</td>
                        <td>{element.fAlta}</td>
                        <td>{element.fAlta}</td>
                        <td>
                            <a href={`/SIA/jur/Files/${element.idVolante}/Areas/${element.archivoFinal}`} target="_blank">
                                {element.archivoFinal}
                            </a>
                        </td>
                        <td data-id={index} data-idanexo={element.idAnexoJuridico}>
                            <Switch
                            onChange={this.handleChange}
                            checked={this.state.checked[index]}
                            id="icon-switch"
                            className="react-switch"
                            width={90}
                            checkedIcon={this.checkedIcon}
                            uncheckedIcon={this.uncheckedIcon}
                        />
                        </td>
                    </tr>
                )

            })
        } else {
            return (
                <tr>
                    <td>Sin datos</td>
                </tr>
            )
        }
    }


    HandleClickAnexar = () => {
        this.props.open()
    }


    render(){
        console.log(this.state)
            return(
                <div className="container">
                    <div className="row" >
                        <button className="btn btn-success btn-sm" onClick={this.HandleClickAnexar}>Anexar Documento</button>
                       
                    </div>
                    <div className="row">
                        <table className="table">
                        <tbody>
                            <tr>
                                <th>Enviado Por:</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Archivo</th>
                                <th>Estatus</th>
                            </tr>
                            {
                                <this.TablaDocumentos />
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
    }
}

