import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/OficiosGenericos/Insert'
import axios from 'axios';
import ModalError from '../../Components/Modals/ErrorLoad';

const root = document.getElementById('root');
const idVolante = sessionStorage.getItem('idVolante');
const modulo = sessionStorage.getItem('modulo');
axios.get('/SIA/juridico/Api/Remitente_Cedula_Diversos',{params:{idVolante}})
.then((response)=>{
  let datos = response.data;

  if(datos.status){
    render(<Home data={datos.data} idVolante={idVolante} modulo={modulo} />,root);
  } else {
    render(<ModalError {...response.data} />,root);
  }

});
