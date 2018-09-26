import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Volantes/Home'
import axios from 'axios';
import ModalError from '../../Components/Modals/ErrorLoad';

const root = document.getElementById('root');

const date = new Date();
let year = date.getFullYear();

axios.get('/SIA/juridico/Volantes/Years')
.then((response)=>{
  let datos = response.data;

  if(datos.status){
    render(<Home data={datos.data} modulo='Volantes' year={year}/>,root);
  } else {
    render(<ModalError {...response.data} />,root);
  }

});
