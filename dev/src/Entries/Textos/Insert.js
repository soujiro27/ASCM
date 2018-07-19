import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Textos/Insert'
import axios from 'axios';


const  root = document.getElementById('root');
let url = '/SIA/juridico/Api/Documentos';
axios.get(url)
.then((response) => {

    render(<Home data={response.data}/>,root);

})
