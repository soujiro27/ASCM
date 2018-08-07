
export default class submit {
    

    createData(form){
        let elementos = form[0].elements
        let formData = new FormData()

        console.log(elementos)
        for(let x = 0;x<elementos.length-2;x++){
            formData.append(elementos[x].name,elementos[x].value)

        }
        return formData
    }

    createDataUpdate(form,nombre,id){
        let elementos = form[0].elements
        let formData = new FormData()

        for(let x = 0;x<elementos.length-2;x++){
            formData.append(elementos[x].name,elementos[x].value)

        }
        formData.append(nombre,id)
        return formData
    }

    resolve_request(response){
        
        let state
        if(response.status == 500){
            state = {
                modal:{
                    visible:true,
                    message:'Ha ocurrido un error contacte al adminstrador del Sistema',
                    class:'error',
                    icon:false
                }
            }

        } else if (response.status == 200 ){
               
            if(response.data[0] === 'OK'){

                state = {
                    modal:{
                        visible:true,
                        message:'Registro Exitoso',
                        class:'success',
                        icon:true,
                        success:true
                    }
                }
            } else {

                state = {
                    modal:{
                        visible:true,
                        message:response.data[0],
                        class:'error',
                        icon:false
                    }
                }
            }

        }

        return state
    }


   


    errorData(data,message){
        let datos = data.formData
        let form = {}
        for(let x in datos){
            form['form'] = {
                [x]:datos[x]
            }
        }

        form['modal'] = {
           
                message:message,
                visible:true,
                class:'error',
                icon:false
        }

        return form
        
    }
    
    successData(){
        let res = {
                modal:{
                    visible:true,
                    message:'Registro Exitoso',
                    class:'success',
                    icon:true,
                    status:true
                }
            }

        return res
    }

}

