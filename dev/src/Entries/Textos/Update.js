
import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Textos/Update'
import axios from 'axios';

const  root = document.getElementById('root');
const id = sessionStorage.getItem('idTexto')
const url = `/SIA/juridico/Textos/Register/${id}`

function documentos(){
    return axios.get('/SIA/juridico/Api/Documentos');
}

function subDocumentos(){
    return axios.get('/SIA/juridico/Api/SubDocumentosTest',{params:{auditoria:'SI'}});
}

function datos () {
    return axios.get(url);
}

axios.all([documentos(),subDocumentos(),datos()])
.then(axios.spread((documentos,subDocumentos,datos)=>{
render(<Home documentos={documentos.data} subDocumentos={subDocumentos.data} data={datos.data.data}/>,root);
}))
