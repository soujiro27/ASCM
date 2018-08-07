import React from 'react';

const HeaderCedula = (props) => {
	
	return(
		<ul className="menu-cedulas">
		{props.menu.map(item => (
			<li>{item}</li>	
		))}
		</ul>
	)
}


export default HeaderCedula;