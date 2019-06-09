import React from 'react';
import {Link} from 'react-router-dom'
import {URL} from '../consts';
export default class TableContent extends React.Component {
	constructor(props){
        super(props);
        this.state = {isUserAuthor: false};        
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
                let tableContentsJson = responseJson.payload[0].tableContents;
                let tableContents = JSON.parse(tableContentsJson);
                this.setState({
                    isUserAuthor: responseJson.isUserAuthor,
                    units: tableContents.units,
                    sections: tableContents.sections,
                    courseTitle:  responseJson.payload[0].title
                });
            }else {
                window.location = "/main_page";
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
                <Link to={`/course_page/${this.props.courseId}/${section.id}`}>
                    <li className={'table-contents__item '}>
                        <div className={'item_section'}>
                            {section.number} <span>{section.title}</span>
                        </div>
                    </li>
                </Link>)
			return(
				<ul className={'table-contents__section-list'}>
					<li className={'table-contents__item item_unit'}>
                        <span className={'table-contents__item__input'}>
                            {unit}
                        </span> 
                    </li>
					{currentLiList} 
                </ul>
			)
		}) : <li/>

        const logoutButton = this.props.isAuth ? 
            <button onClick={this.onLogout} className='header__logout' type='button'>
                Выйти
            </button> : null;
        const editButton = this.state.isUserAuthor ? 
            <Link to={`/edit_course/${this.props.courseId}`} className='header__logout'>
                Редактировать
            </Link> : null
		return (
			<div className={'table_contents__content'}>
                <div className={'content__header'}>
                    <span  className={'header__search'}>
                        {this.state.courseTitle}
                    </span>
                    {editButton}
                    {logoutButton}
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