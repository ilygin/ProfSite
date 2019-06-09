import React from 'react';
import {Link} from 'react-router-dom'
import Person from './personalInfo';
import SidebarList from './menu';
class Sidebar extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div  className={'sidebar'}>
				<Link to={"/main_page"}>
					<div className={'sidebar__logo'}>
						Logotype
					</div>
				</Link>
                <Person />
                <SidebarList />
			</div>
		)
	}
}

export default Sidebar;
