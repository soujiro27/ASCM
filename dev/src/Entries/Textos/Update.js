import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Textos/Update'
import axios from 'axios';


let element = document.getElementById('root')
let id = element.dataset.id
let url = `/SIA/juridico/Textos/Register/${id}`
let urlDocumentos = '/SIA/juridico/Api/Documentos';

function documentos (){
    return axios.get(urlDocumentos);
}

function data () {
    return axios.get(url);
}

axios.all([documentos(),data()])
.then(axios.spread((documentos,datos)=>{
    render(<Home data={datos.data} documentos={documentos.data} />,element);
}))
