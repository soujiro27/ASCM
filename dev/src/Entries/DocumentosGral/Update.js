import React, { Component } from 'react';
import { render } from 'react-dom';
import Home from './../../Home/DocumentosGral/Update'
import axios from 'axios';

let element = document.getElementById('root')
let id = element.dataset.id

render(<Home id={id} />,element);
