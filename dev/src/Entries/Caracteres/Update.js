import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Caracteres/Update'
import axios from 'axios';
import ModalError from '../../Components/Modals/ErrorLoad';

const root = document.getElementById('root')
const idAccion = sessionStorage.getItem('idCaracter');

axios.get(`/SIA/juridico/Caracteres/Register/${idAccion}`)
.then((response)=>{
  let datos = response.data;

  if(datos.status){
    render(<Home data={datos.data} />,root);
  } else {
    render(<ModalError {...response.data} />,root);
  }

});
