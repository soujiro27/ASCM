import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Acciones/Update'
import axios from 'axios';
import ModalError from '../../Components/Modals/ErrorLoad';

const root = document.getElementById('root')
const idAccion = sessionStorage.getItem('idAccion');

axios.get(`/SIA/juridico/Acciones/Register/${idAccion}`)
.then((response)=>{
  let datos = response.data;

  if(datos.status){
    render(<Home data={datos.data} />,root);
  } else {
    render(<ModalError {...response.data} />,root);
  }

});
