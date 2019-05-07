import React from 'react';
import ItemSidebar from '../blocks/sidebar/itemSidebarList';

class SidebarList extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
        let listTemp = [
            {name: "Основное:"},
            {name: "Все курсы"},
            {name: "Мои курсы"},
            {name: "Текущие курсы"},
            {name: "Пройденные курсы"}
        ];

        let sidebar = listTemp.map((item, index) =>
            <ItemSidebar key={index} item_name={item.name} id={index}/>
        )
        
		return (
			<div>
                {sidebar}
            </div>
		)
	}
}

export default SidebarList;
