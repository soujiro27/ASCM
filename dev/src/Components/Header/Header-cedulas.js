import React from 'react';
import './Header.styl';
const HeaderCedula = (props) => {

	return(
		<ul className="menu-cedulas row Header">
		{props.menu.map( (item,index) => (

			<li className={props.active==item ? 'active': undefined} key={item}>
				<a href={`/SIA/juridico/${props.url[index]}/${props.id}`}>
					{item}
				</a>
			</li>
		))}
		</ul>
	)
}


export default HeaderCedula;
