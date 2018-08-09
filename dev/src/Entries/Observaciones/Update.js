import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Observaciones/Update'
import axios from 'axios';


let element = document.getElementById('root')
let id = element.dataset.id
let modulo = element.dataset.modulo
let url = `/SIA/juridico/Observaciones/Register/${id}`
axios.get(url)
.then(response => {
    render(<Home data={response.data} modulo={modulo} />,element);
})