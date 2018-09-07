import React from 'react';
import './Header.styl';
const HeaderCedula = (props) => {
	let cedula = `${props.modulo}/Cedula/${props.idVolante}`
	let menu = ['Asignacion','Respuestas','Observaciones','Cedula'];
	let url = ['Asignacion','Respuestas','Observaciones',cedula];
	if(props.modulo === 'Confronta' || props.modulo === 'DocumentosDiversos'){
		menu.splice(2,1);
		url.splice(2,1);
	}
	return(

		<ul className="menu-cedulas row Header">
		{menu.map( (item,index) => (

			<li className={props.active==item ? 'active': undefined} key={item}>
				<a href={`/SIA/juridico/${url[index]}`}>
					{item}
				</a>
			</li>
		))}
		</ul>
	)
}


export default HeaderCedula;
