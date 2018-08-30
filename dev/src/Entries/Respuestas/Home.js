import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Home from './../../Home/Respuestas/Home'

const root = document.getElementById('root');
const idVolante = sessionStorage.getItem('idVolante');
const modulo = sessionStorage.getItem('modulo');

axios.get('/SIA/juridico/Api/Puestos/Asignacion')
.then(response => {
  render(<Home puestos={response.data} idVolante={idVolante} modulo={modulo} />,root);
})
