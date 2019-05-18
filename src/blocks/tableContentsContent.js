import React from 'react';
import {connect} from 'react-redux';
import * as saveCourseActions from '../actions/saveCourseActions';

class TableContentsContent extends React.Component {
	constructor(props){
        super(props);
        this.state = {
            units: ["Модуль 1", "Модуль 2"],
            sections: [{
                title: "Раздел",
				unitId: 0,
				number: "1.1",				
                id: 1
            },
            {
                title: "Раздел",
				unitId: 0,
				number: "1.2",
                id: 1
            },
            {
                title: "Раздел",
				unitId: 1,
				number: "2.1",				
                id: 3
            }]
        }
		this.createUnit = this.createUnit.bind(this);
		this.onSaveCourse = this.onSaveCourse.bind(this);
		this.titleCourseChange = this.titleCourseChange.bind(this);
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
			number: `${++unitId} ${++sectionsInUnitCount}`,
            id: currentsectionsLength
        }
        this.setState(prevState => ({
            sections: [...prevState.sections, newelement]
        }))
      }

	titleCourseChange(event) {
		console.log(this.state.courseTitle);
		this.setState({courseTitle: event.target.value});
	}

	onSaveCourse() {
		const {courseTitle, units, sections } = this.state;
		this.props.saveCourseChange(courseTitle, units, sections, 5);
	}

	render() {
        let contentList = this.state.units.map((unit,unitIndex)=> {
			let currentLi = this.state.sections.filter(section => section.unitId === unitIndex);
			currentLi = currentLi.sort((a,b)=> (a.id - b.id));
			let currentLiList = currentLi.map(section => <li>{section.number +" " + section.title} </li>)
			return(
				<ul>
					<li>{unit}</li>
					{currentLiList}
					<button onClick={this.createSection.bind(this, unitIndex, currentLiList.length)}>Создать section</button>
				</ul>
			)
		})

		return (
			<div className={'table_contents__content'}>
				<div className={'table_contents__content'}>
                    <input type="text" value={this.state.courseTitle} placeholder="Введите название курса" onChange={this.titleCourseChange}/>
                    <button onClick={this.onSaveCourse}>Сохранить курс</button>
                </div>  
                <div className={'table_contents__content'}>
                    <div>
                        <ul>   
                            {contentList}
                        </ul>

                    </div>
                    <button onClick={this.createUnit}>Создать главу</button>
                </div>
			</div>
		)
	}
}
const mapStateToProps = state => {
    return {
        user: state.loginUser,
        courses: state.courses
    }
};

const mapDispatchToProps = {
    ...saveCourseActions,
  };

export default connect(mapStateToProps, mapDispatchToProps)(TableContentsContent);