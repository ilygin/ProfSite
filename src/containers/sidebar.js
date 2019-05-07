import React from 'react';
import Person from './personalInfo';
import SidebarList from './sidebarList';
class Sidebar extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div  className={'sidebar'}>
                <div className={'sidebar__logo'}>
                    Logotype
                </div>
                <Person />
                <SidebarList />
			</div>
		)
	}
}

export default Sidebar;
