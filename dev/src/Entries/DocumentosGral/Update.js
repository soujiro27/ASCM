import React from 'react';
import { render } from 'react-dom';
import Home from './../../Home/DocumentosGral/Update'
import axios from 'axios';
import ModalError from '../../Components/Modals/ErrorLoad';

const  root = document.getElementById('root');
const id = sessionStorage.getItem('turnado');
const url = `/SIA/juridico/DocumentosGral/Update/${id}`

axios.get(url)
.then((response)=>{
  let datos = response.data;
  if(datos.status){
    render(<Home data={datos.data} />,root);
  } else {
    render(<ModalError {...response.data} />,root);
  }

});
