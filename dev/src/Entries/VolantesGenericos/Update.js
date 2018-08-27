import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/VolantesDiversos/Update'
import axios from 'axios';

const  root = document.getElementById('root');
let caracteres_url = '/SIA/juridico/Api/Caracteres';
let areas_url = '/SIA/juridico/Api/Turnados';
let acciones_url = '/SIA/juridico/Api/Acciones';

let id = localStorage.getItem('idVolante');
let url = `/SIA/juridico/VolantesDiversos/Update/${id}`


function caracteres(){
    return axios.get(caracteres_url);
}

function areas(){
    return axios.get(areas_url,{params:{tipo:'S'}});
}

function acciones(){
    return axios.get(acciones_url);
}

function data () {
    return axios.get(url);
}

axios.all([data(),caracteres(),areas(),acciones()])
.then(axios.spread(function(datos,caracteres,areas,acciones,){
    render(<Home
            datos={datos.data}
            caracteres={caracteres.data}
            areas={areas.data}
            acciones={acciones.data}
    />,root);

}))
