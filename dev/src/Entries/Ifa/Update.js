import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Ifa/Update'
import axios from 'axios';


let element = document.getElementById('root')
let id = element.dataset.id
let url = `/SIA/juridico/Ifa/Cedula/Register/${id}`
axios.get(url)
.then(response => {
    render(<Home data={response.data}  />,element);
})
