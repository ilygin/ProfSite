import React from 'react';
import {URL} from '../consts';
export default class TableContent extends React.Component {
	constructor(props){
        super(props);
        this.state = {};        
		this.onLogout = this.onLogout.bind(this);
	}
    onLogout(e)  {
		e.preventDefault();
		try {
			this.props.logOut();
		}catch (error) {
			console.log(`Error: ${error}`);
		}
    }

    async componentWillMount() {
        
        try {
            const response = await fetch(`${URL}/courseAPI/loadTableContents?id=${this.props.courseId}`);
            const responseJson = await response.json();
            if(responseJson.status ==="success") {
                debugger;   
                let tableContentsJson = responseJson.payload[0].tableContents;
                let tableContents = JSON.parse(tableContentsJson);
                this.setState({
                    units: tableContents.units,
                    sections: tableContents.sections,
                    courseTitle:  responseJson.payload[0].title
                });
            }else {
                this.setState({
                    units: ["Глава 1"],
                    sections: [{
                        title: "Раздел",
                        unitId: 0,
                        number: "1.1",				
                        id: 1
                    }]            
                });
            }
        } catch (error) {
            console.error(error);
            this.setState({
                units: ["Глава 1"],
                sections: [{
                    title: "Раздел",
                    unitId: 0,
                    number: "1.1",				
                    id: 1
                }]            
            });
        }
    }
	
	render() {
        let contentList = this.state.units ? this.state.units.map((unit, unitIndex)=> {
			let currentLi = this.state.sections.filter(section => section.unitId === unitIndex);
			currentLi = currentLi.sort((a,b)=> (a.id - b.id));
			let currentLiList = currentLi.map(section => 
                <li className={'table-contents__item '}>
                    <div className={'item_section'}>
                        {section.number}
                        <input  className={'table-contents__item__input'}
                                type="text" 
                                defaultValue={section.title}/>
                    </div>
                </li>)
			return(
				<ul className={'table-contents__section-list'}>
					<li className={'table-contents__item item_unit'}>
                        <input  className={'table-contents__item__input'}
                                type="text" 
                                defaultValue={unit}/>
                    </li>
					{currentLiList} 
                </ul>
			)
		}) : <li/>

		return (
			<div className={'table_contents__content'}>
                <div className={'content__header'}>
                    <input type='text' 
                            value={this.state.courseTitle}
                            placeholder='Введите название курса'
                            className={'header__search'}/>

                    <button onClick={this.onLogout} className='header__logout' type='button'>
                        Выйти
                    </button>
                </div>
                  
                <div className={'table-contents_container'}> 
                        <ul className={'table-contents_ul'}>   
                            {contentList}
                        </ul>
                </div>
			</div>
		)
    }
}