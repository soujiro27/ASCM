import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Home from './../../Home/Irac/Cedula'

let element = document.getElementById('root')
let id = element.dataset.id

let url = `/SIA/juridico/Irac/Cedulas/Register`

axios.get(url,{params:{id}}).then(response => {
  if(response.status == 200){
    render(<Home id={id}  data={response.data}/>,element);
  }
})
