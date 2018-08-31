import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Irac/Insert'

const element = document.getElementById('root');
const idVolante = sessionStorage.getItem('idVolante');

render(<Home idVolante={idVolante} />,element);
