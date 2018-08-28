import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Volantes/Insert'
import axios from 'axios';

const  root = document.getElementById('root');
let documentos = '/SIA/juridico/Api/Documentos';
let caracteres_url = '/SIA/juridico/Api/Caracteres';
let areas_url = '/SIA/juridico/Api/Turnados';
let acciones_url = '/SIA/juridico/Api/Acciones';
let cuenta_url = '/SIA/juridico/Api/Cuenta';

function doc(){
    return axios.get(documentos);
}

function caracteres(){
    return axios.get(caracteres_url);
}

function areas(){
    return axios.get(areas_url,{params:{tipo:'N'}});
}

function acciones(){
    return axios.get(acciones_url);
}

function cuenta(){
  return axios.get(cuenta_url);
}

axios.all([doc(),caracteres(),areas(),acciones(),cuenta()])
.then(axios.spread(function(documentos,caracteres,areas,acciones,cuenta){
    render(<Home
            documentos={documentos.data}
            caracteres={caracteres.data}
            areas={areas.data}
            acciones={acciones.data}
            cuenta={cuenta.data}
    />,root);

}))
