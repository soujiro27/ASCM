import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Home from './../../Home/Textos/Insert'

const  root = document.getElementById('root');

function documentos(){
    return axios.get('/SIA/juridico/Api/Documentos');
}

function subDocumentos(){
    return axios.get('/SIA/juridico/Api/SubDocumentosTest',{params:{auditoria:'SI'}});
}

axios.all([documentos(),subDocumentos()])
.then(axios.spread((documentos,subDocumentos)=>{
    render(<Home documentos={documentos.data} subDocumentos={subDocumentos.data} />,root);
}))
