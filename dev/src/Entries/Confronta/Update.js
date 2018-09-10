import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Confronta/Update'
import axios from 'axios';
import ModalError from '../../Components/Modals/ErrorLoad';

const root = document.getElementById('root');
const idObservacion = sessionStorage.getItem('idVolante');
let url = `/SIA/juridico/Confronta/Cedula/Register/${idObservacion}`
axios.get(url)
.then((response)=>{
  let datos = response.data;
  if(datos.status){
    render(<Home data={datos.data} />,root);
  } else {
    render(<ModalError {...response.data} />,root);
  }

});
