import React from 'react';

const folio = (props) => {
    return(
        <div className="row">
        <div className="col-lg-2">
            <label>Folio</label>
            <input type="number" max="999" min="1" required name="folio" className="form-control" />
        </div>
        <div className="col-lg-2">
            <label>Sub Folio</label>
            <input type="number" max="999" min="0" required name="subFolio" className="form-control" />
        </div>

        <div className="col-lg-4">
            <label>Numero de Documento ({props.Numero_Documento})</label>
            <input type="text" maxLength="100" required name="Numero_Documento" className="form-control"  onChange={props.CountCaracterText}/>
        </div>
        <div className="col-lg-2">
            <label>Anexos</label>
            <input type="number" max="999" min="0" required name="anexos" className="form-control" />
        </div>
    </div>
    )
}


export default folio;