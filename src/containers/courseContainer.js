import React from 'react';
import {connect} from 'react-redux';
import CourseItem from '../blocks/courseItem';
import * as coursesActions from '../actions/loadLisrCoursesActions';

class CourseContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentWillMount() {
		try {
			await this.props.loadCourses(!this.props.user.isAuth, this.props.isPrivateCourse);
    } catch (e) {
			console.error('Error: ', e);
		}
	}

	

	render() {
		const list = this.props.courses.payload.map(item => {
				console.log(item.authorId == this.props.user.id);
				console.log(item.authorId)
				console.log(this.props.user.id)
				return (<CourseItem 
					key={item.id.toString()} 
					title={item.title} 
					id={item.id}
					isAuthor= {item.authorId == this.props.user.id}/>
				)
		}
					);
		
		return (
			<div className={"list-course_container"}>
				<ul className="list-courses_ul">
					{list}			
				</ul>
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
    ...coursesActions,
  };

export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer);