
import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Textos/Update'
import axios from 'axios';

const  root = document.getElementById('root');
let id = sessionStorage.getItem('idTexto')
let urlDocumentos = '/SIA/juridico/Api/Documentos';
let url = `/SIA/juridico/Textos/Register/${id}`


function documentos(){
    return axios.get(urlDocumentos);
}

function data () {
    return axios.get(url);
}


axios.all([data(),documentos()])
.then(axios.spread(function(datos,documentos){
    render(<Home
            datos={datos.data}
            documentos={documentos.data}
    />,root);
}))
