import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/OficiosGenericos/Update'
import axios from 'axios';
import ModalError from '../../Components/Modals/ErrorLoad';

const root = document.getElementById('root')
const idVolante = sessionStorage.getItem('idVolante');

axios.get(`/SIA/juridico/DocumentosDiversos/Register/${idVolante}`)
.then((response)=>{
  let datos = response.data;

  if(datos.status){
    render(<Home data={datos.data} />,root);
  } else {
    render(<ModalError {...response.data} />,root);
  }

});
