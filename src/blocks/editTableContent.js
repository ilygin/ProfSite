import React from 'react';
import { Link } from 'react-router-dom';

import {URL} from '../consts';
export default class TableContentsContent extends React.Component {
	constructor(props){
        super(props);
        this.state = {};
        
		this.onLogout = this.onLogout.bind(this);
		this.createUnit = this.createUnit.bind(this);
		this.onSaveCourse = this.onSaveCourse.bind(this);
		this.titleCourseChange = this.titleCourseChange.bind(this);
	}
    onLogout(e)  {
		e.preventDefault();
		try {
			this.props.logOut();
		}catch (error) {
			console.error(`Error: ${error}`);
		}
    }

    async componentWillMount() {
        try {
            const response = await fetch(`${URL}/courseAPI/loadTableContents?id=${this.props.courseId}`);
            const responseJson = await response.json();
            if(responseJson.status ==="success") {
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
                                onChange={this.sectionTitleChange.bind(this, {unitId: section.unitId, id: section.id})} 
                                defaultValue={section.title}/>
                    </div>
                    
                    <Link to={`/edit_page/${this.props.courseId}/${section.id}`} className={'table-contents__item__edit'}> 
                        <button className={'item__edit_btn'}>
                            Редактировать
                        </button>
                    </Link>
                </li>)
			return(
				<ul className={'table-contents__section-list'}>
					<li className={'table-contents__item item_unit'}>
                        <input  className={'table-contents__item__input'}
                                type="text" 
                                defaultValue={unit}
                                onChange={this.unitTitleChange.bind(this, unitIndex)}/>
                    </li>
					{currentLiList}
                    <button className={'table-contents__item__button'} 
                            onClick={this.createSection.bind(this, unitIndex, currentLiList.length)}>Создать раздел</button>
                </ul>
			)
		}) : <li/>

		return (
			<div className={'table_contents__content'}>
                <div className={'content__header'}>
                    <input type='text' 
                            value={this.state.courseTitle}
                            placeholder='Введите название курса'
                            className={'header__title'} 
                            onChange={this.titleCourseChange}/>

                    {this.props.editCourseStatus ? this.props.editCourseStatus.msg : ""}
                    <button onClick={this.onSaveCourse} className={'header__save-course'}>Сохранить курс</button>
                    <button onClick={this.onLogout} className='header__logout' type='button'>
                        Выйти
                    </button>
                </div>
                  
                <div className={'table-contents_container'}> 
                        <ul className={'table-contents_ul'}>   
                            {contentList}
                            <button className={'table-contents__item__button create-unit'} 
                                    onClick={this.createUnit}>
                                        Создать главу
                            </button>
                        </ul>
                </div>
			</div>
		)
    }
    
    createUnit() {
        let currentUnitsLength = this.state.units.length+1;
        let newelement = `${currentUnitsLength}. Новая глава`;

        this.setState(prevState => ({
            units: [...prevState.units, newelement]
        }))
    }
    createSection(unitId, sectionsInUnitCount) { 
        let currentsectionsLength = this.state.sections.length+1;
        let newelement = {
            title: `Новый раздел`,
			unitId,
			number: `${++unitId}.${++sectionsInUnitCount}. `,
            id: currentsectionsLength
        }
        this.setState(prevState => ({
            sections: [...prevState.sections, newelement]
        }))
      }
      
    sectionTitleChange(params, event) {
        let currentState = this.state.sections;
        let changeSectionIndex = currentState.findIndex(section => section.unitId===params.unitId && section.id===params.id);
        currentState[changeSectionIndex].title = event.target.value;
        this.setState({
            sections: currentState
        })
        
    }
    unitTitleChange(unitIndex, event) {
        let currentState = this.state.units;
        currentState[unitIndex] = event.target.value;
        this.setState({
            units: currentState
        })
        
    }
	titleCourseChange(event) {
		this.setState({courseTitle: event.target.value});
	}

	onSaveCourse() {
		const {courseTitle, units, sections} = this.state;
		this.props.saveCourseChange(courseTitle, units, sections, this.props.courseId);
	}
}