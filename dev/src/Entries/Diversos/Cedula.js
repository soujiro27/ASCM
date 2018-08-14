import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import Home from './../../Home/Diversos/Cedula'

let element = document.getElementById('root')
let id = element.dataset.id

//let url = `/SIA/juridico/DocumentosDiversos/Cedulas/Register`
let url_nota = `/SIA/juridico/DocumentosDiversos/Nota/Register`


axios.get(url_nota,{params:{id:id}}).then(response => {
  let tipo = response.data[0].idTipoDocto
  if(tipo === 'OFICIO' || tipo === 'CIRCULAR'){

    location.href = `/SIA/juridico/DocumentosDiversos/OficioGenerico/${id}`

  } else if (tipo === 'NOTA') {

      location.href = '/SIA/juridico/DocumentosDiversos/NotaGenerica'

  }
})

/*
axios.all([data(),nota()]).then(
  axios.spread( (datos,nota) =>{
    render(<Home id={id}  data={datos.data} nota={nota.data}/>,element);
  }));
*/
