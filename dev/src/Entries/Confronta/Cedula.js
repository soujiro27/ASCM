import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Home from './../../Home/Confronta/Cedula'

let element = document.getElementById('root')
let id = element.dataset.id

let url = `/SIA/juridico/Confronta/Cedulas/Register`
let url_nota_confronta = `/SIA/juridico/Confronta/Nota/Register`

const datos = () => ( axios.get(url,{params:{id}}));
const nota = () => (axios.get(url_nota_confronta,{params:{id}}));



axios.all([datos(),nota()]).then(
  axios.spread((data,nota) => {
    render(<Home id={id}  data={data.data} nota={nota.data[0].notaConfronta}/>,element);
  })
);
