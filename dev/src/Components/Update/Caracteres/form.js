import React from 'react';


const Form = (props) => {
    console.log(props)
    return(
    <div className="form-container">

     <div className="form-group col-lg-4">
        <label>Siglas</label>
        <input
            className="form-control"
            type="text"
            maxLength='2'
            name='siglas'
            placeholder="Siglas"
            required
            defaultValue={props.data.siglas}
        />
        </div>

        <div className="form-group col-lg-4">
        <label>Nombre</label>
        <input
            className="form-control"
            type="text"
            maxLength='10'
            name='nombre'
            placeholder="Nombre"
            required
            defaultValue={props.data.nombre}
        />
        </div>
        <div className="form-group col-lg-4">
            <label>Estatus</label>
            <select defaultValue={props.data.estatus} className="form-control" name="estatus" required>
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
            </select> 
        </div>
        <div className="col-lg-4">
            <input type="submit" value="Guardar" className="btn btn-sm btn-primary" />
            <button className="btn btn-danger btn-sm" onClick={props.cancel}>Cancelar</button>
        </div>
    </div>
    )
}

export default Form;