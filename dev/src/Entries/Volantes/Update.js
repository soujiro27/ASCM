import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Volantes/Update'
import axios from 'axios';

const  root = document.getElementById('root');
let caracteres_url = '/SIA/juridico/Api/Caracteres';
let areas_url = '/SIA/juridico/Api/Turnados';
let acciones_url = '/SIA/juridico/Api/Acciones';
let element = document.getElementById('root')
let id = element.dataset.id
let url = `/SIA/juridico/Volantes/Register/${id}`


function caracteres(){
    return axios.get(caracteres_url);
}

function areas(){
    return axios.get(areas_url,{params:{tipo:'N'}});
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
            data={datos.data}
            caracteres={caracteres.data}
            areas={areas.data}
            acciones={acciones.data}
    />,root);
    
}))
