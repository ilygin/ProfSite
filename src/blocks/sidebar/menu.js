import React from 'react';
import MenuItem from './menuItem';
import ItemAllCourse from '../../../dist/itemAllCourse.svg';
import Project from '../../../dist/project.svg';
import ProcessStudy from '../../../dist/processStudy.svg';
import Achive from '../../../dist/achive.svg';



class SidebarList extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
        let menuListTemp = [
            {name: "Основное:", imgSvg: null},
            {name: "Все курсы", imgSvg: ItemAllCourse},
            {name: "Мои работы", imgSvg: Project},
            {name: "Процесс обучения", imgSvg: ProcessStudy},
            {name: "Достижения", imgSvg: Achive}
        ];

        let menu = menuListTemp.map((item, index) =>
            <MenuItem key={index} item_name={item.name} id={index} imgSvg={item.imgSvg}/>
        )
        
		return (
			<div className={'sidebar__menu'}>
                {menu}
            </div>
		)
	}
}

export default SidebarList;
