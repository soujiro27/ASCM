import axios from 'axios';


export const load_years_volantes = (modulo) =>{
    return axios.get(`/SIA/juridico/${modulo}/Years`)
    then(respose => response.data.data)
}

export const get_data_volantes = (year) => {
    return axios.get('/SIA/juridico/Volantes/All',{params:{year}})
    .then(response => response.data.data);
}

export const create_object_form = (form,formData) => {
    
    let elementos = form[0].elements;
    let  formulario = {};
    for(let x = 0;x<elementos.length-2;x++){
        if(elementos[x].name != ''){
            formulario[elementos[x].name] = elementos[x].value;
        }
    }

    let keys = Object.keys(formData);

    keys.map(item => {
        formulario[item] = formData[item];
    });

    return formulario;
        
}

export const HandleChangeDocumentos = value => {
    

}