import React,{Component} from 'react';
import Switch from "react-switch";
import axios from 'axios'

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
            console.log(estatus)
            console.log(checked)
            let position = event.target.parentNode.parentNode.getAttribute('data-id')
            let idAnexoJuridico = event.target.parentNode.parentNode.getAttribute('data-idanexo')
           
            
            let form = new FormData();
            
            form.append('id',idAnexoJuridico)
            form.append('estatus',estatus)
            form.append('idAnexoTurnado',this.props.data)
            axios.post('/SIA/juridico/DocumentosGral/Update',form)
            .then((response)=>{
                if(response.status == 200){
                    this.setState({
                        checked:{[position]:checked}
                    })
                }
            })
        }
    }


    componentWillMount(){
        for(let x in this.props.data){
            let valor
            this.props.data["0"].estatus == 'ACTIVO' ? valor = true : valor = false
            this.setState({
                checked:{
                    [x]:valor
                }
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

   
                
               /* return()
 */


    render(){
       
            return(
                <div className="container">
             
                    <div className="table-container">
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
                                    this.props.data.map((element,index) => {
                                        return(
                                            <tr key={element.idAnexoJuridico}>
                                                <td>{element.areaRemitente}</td>
                                                <td>{element.fAlta}</td>
                                                <td>{element.fAlta}</td>
                                                <td>{element.archivoFinal}</td>
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
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
    }
}
