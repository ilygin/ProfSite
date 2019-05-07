import React from 'react';
import MenuItem from '../../blocks/sidebar/menuItem';

class SidebarList extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
        let menuListTemp = [
            {name: "Основное:"},
            {name: "Все курсы"},
            {name: "Мои курсы"},
            {name: "Текущие курсы"},
            {name: "Пройденные курсы"}
        ];

        let menu = menuListTemp.map((item, index) =>
            <MenuItem key={index} item_name={item.name} id={index}/>
        )
        
		return (
			<div className={'sidebar__menu'}>
                {menu}
            </div>
		)
	}
}

export default SidebarList;
