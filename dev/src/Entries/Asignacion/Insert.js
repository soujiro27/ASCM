import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Asignacion/Insert'
import axios from 'axios';


function getPuestos() {
  return axios.get('/SIA/juridico/Api/Puestos/Asignacion');
}

function getCaracteres() {
  return axios.get('/SIA/juridico/Api/Caracteres');
}

const root = document.getElementById('root');
const idVolante = sessionStorage.getItem('idVolante');
const modulo = sessionStorage.getItem('modulo');


axios.all([getPuestos(),getCaracteres()])
.then(axios.spread((puestos,caracteres) => {
  render(
    <Home
      puesto={puestos.data}
      caracteres={caracteres.data}
      idVolante={idVolante}
      modulo={modulo}
      />,root);
}));
