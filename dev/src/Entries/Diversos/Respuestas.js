import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/Diversos/Respuestas'

let element = document.getElementById('root')
let id = element.dataset.id
render(<Home id={id} />,element);
