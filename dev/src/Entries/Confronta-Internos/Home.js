import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Confronta-internos/Home'
import axios from 'axios';
import ModalError from '../../Components/Modals/ErrorLoad';

const root = document.getElementById('root');

axios.get('/SIA/juridico/Confrontas-Internos/All')
.then((response)=>{
  let datos = response.data;

  if(datos.status){
    render(<Home data={datos.data} />,root);
  } else {
    render(<ModalError {...response.data} />,root);
  }

});
