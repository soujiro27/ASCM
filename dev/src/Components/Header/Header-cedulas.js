import React from 'react';
import './Header.styl';
const HeaderCedula = (props) => {

	return(
		<ul className="menu-cedulas row Header">
		{props.menu.map(item => (
			<li className={props.active==item ? 'active': undefined} key={item}>
				<a href={`/SIA/juridico/${props.modulo}/${item}/${props.id}`}>
					{item}
				</a>
			</li>
		))}
		</ul>
	)
}


export default HeaderCedula;
