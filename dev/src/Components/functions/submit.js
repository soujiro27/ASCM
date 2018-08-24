
export default class submit {


    createData_complete(form,formData){
      let elementos = form[0].elements
      let formulario = new FormData(form)

<<<<<<< HEAD

        for(let x = 0;x<elementos.length-2;x++){
            formData.append(elementos[x].name,elementos[x].value)
            if(elementos[x].type == 'file' && elementos[x].files.length > 0 ){
              formData.append(elementos[x].name,elementos[x].files[0])
            }
=======
      for(let x = 0;x<elementos.length-2;x++){
          formulario.append(elementos[x].name,elementos[x].value);
          if(elementos[x].type == 'file' && elementos[x].files.length > 0 ){
            formulario.append(elementos[x].name,elementos[x].files[0])
          }
>>>>>>> nuevo


      }

      let keys = Object.keys(formData);
      keys.map(item => {
        formulario.append(item,formData[item])
      });


        return formulario
    }

<<<<<<< HEAD
    appendFormData(formData,form){

      let keys = Object.keys(formData);
      keys.map(item => {
        form.append(item,formData[item])
      });

      return form;

    }
=======

>>>>>>> nuevo

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
<<<<<<< HEAD

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

=======
      let respuesta = {modal:true,response:response.data.status};

      if(response.status === 200 && response.data.status){
        respuesta['nombre'] = 'SUCCESS'
      } else {
        respuesta['nombre'] = 'ERROR';
        respuesta['message'] = response.data.message
      }
      return respuesta;
    }
>>>>>>> nuevo
}
