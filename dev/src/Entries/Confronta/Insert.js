import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Confronta/Insert'
import axios from 'axios';

const root = document.getElementById('root');
const idVolante = sessionStorage.getItem('idVolante');

axios.get('/SIA/juridico/Api/Remitente_Cedula',{params:{idVolante}})
.then((response)=>{
  let datos = response.data;

  if(datos.status){
    render(<Home data={datos.data} idVolante={idVolante} />,root);
  } else {
    render(<ModalError {...response.data} />,root);
  }

});
