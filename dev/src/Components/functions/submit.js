
export default class submit {


    createData_complete(form,formData){
      let elementos = form[0].elements
      let formulario = new FormData(form)

      for(let x = 0;x<elementos.length-2;x++){
          formulario.append(elementos[x].name,elementos[x].value);
          if(elementos[x].type == 'file' && elementos[x].files.length > 0 ){
            formulario.append(elementos[x].name,elementos[x].files[0])
          }
      }

      let keys = Object.keys(formData);
      keys.map(item => {
        formulario.append(item,formData[item])
      });


        return formulario
    }

    createDataUpdate(form,nombre,id){
        let elementos = form[0].elements
        let formData = new FormData()

        for(let x = 0;x<elementos.length-2;x++){
            formData.append(elementos[x].name,elementos[x].value)
            if(elementos[x].type == 'file' && elementos[x].files.length > 0 ){
              formulario.append(elementos[x].name,elementos[x].files[0])
            }
        }
        formData.append(nombre,id)
        return formData
    }

    createDataUpdateFormData(form,nombre,id,formData){
        let elementos = form[0].elements
        let formulario = new FormData()

        for(let x = 0;x<elementos.length-2;x++){
            formulario.append(elementos[x].name,elementos[x].value)
            if(elementos[x].type == 'file' && elementos[x].files.length > 0 ){
              formulario.append(elementos[x].name,elementos[x].files[0])
            }
        }

        let keys = Object.keys(formData);
        keys.map(item => {
          formulario.append(item,formData[item])
        });

        formulario.append(nombre,id)

        return formulario
    }

    resolve_request(response){

      let respuesta = {modal:true,response:response.data.status};

      if(response.status === 200 && response.data.status){
        respuesta['nombre'] = 'SUCCESS'
      } else {
        respuesta['nombre'] = 'ERROR';
        respuesta['message'] = response.data.message
      }
      return respuesta;
    }
}
