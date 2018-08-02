import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/DocumentosGral/Update'
import axios from 'axios';


let element = document.getElementById('root')
let id = element.dataset.id
let url = `/SIA/juridico/DocumentosGral/Register/${id}`
axios.get(url)
.then(response => {
    render(<Home data={response.data} />,element);
})

