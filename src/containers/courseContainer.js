import React from 'react';
// import Course from '../blocks/main/course';
import {connect} from "react-redux";
// import { Link } from 'react-router-dom';
// import {URL} from './../const.js';
import * as coursesActions from '../actions/courseActions';

class CourseContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            courses: [],
            lastCourseId: -1
        };
	}

	async componentDidMount() {
		try {
			await this.props.loadCourses(!this.props.user.isAuth);
            const {courses} = this.props;
		} catch (e) {
			console.log('Error: ', e);
		}
	}

	render() {
		// const list = this.state.courses.map(item =>
		// 	<Course key={item.id.toString()} course_name={item.course_name} id={item.id}/>
        // );
        console.group('courseContainer');
        console.log(this.state);
        console.log(this.props);
        console.groupEnd('courseContainer');
		return (
			<div>
				<ul className="left-container__list-courses">
					
				</ul>
			</div>
		)
	}
}
const mapStateToProps = state => {
    return {
        user: state.loginUser,
        coures: state.courses
    }
};

const mapDispatchToProps = {
    ...coursesActions,
  };

export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer);