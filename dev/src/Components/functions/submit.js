
export default class submit {


    createData(form){
        let elementos = form[0].elements
        let formData = new FormData()


        for(let x = 0;x<elementos.length-2;x++){
            formData.append(elementos[x].name,elementos[x].value)
            if(elementos[x].type == 'file' && elementos[x].files.length > 0 ){
              formData.append(elementos[x].name,elementos[x].files[0])
            }

        }
        return formData
    }

    appendFormData(formData,form){

      let keys = Object.keys(formData);
      keys.map(item => {
        form.append(item,formData[item])
      });

      return form;

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

        let state = {FORM:true}
        if(response.status == 500){
            state = {
                formModal:{
                    message:'Ha ocurrido un error contacte al adminstrador del Sistema',
                    success:false
                }
            }

        } else if (response.status == 200 ){

          response.data[0] === 'OK' ? state.formModal={success:true} : state.formModal = {message:response.data[0],success:false}
        }

        return state
  }

}
