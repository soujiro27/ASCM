import React from 'react';


const Form = (props) => {
    return(
    <div className="form-container"> 
     <div className="form-group col-lg-4">
        <label>Sigla</label>
        <input
            className="form-control"
            type="text"
            maxLength='2'
            name='siglas'
            placeholder="Siglas"
            required
        />
        </div>
        <div className="form-group col-lg-4">
        <label>Nombre</label>
        <input
            className="form-control"
            type="text"
            maxLength='50'
            name='nombre'
            placeholder="Nombre"
            required
        />
        </div>
        <div className="col-lg-4">
            <input type="submit" value="Guardar" className="btn btn-sm btn-primary" />
            <button className="btn btn-danger btn-sm" onClick={props.cancel}>Cancelar</button>
        </div>
    </div>
    )
}

export default Form;