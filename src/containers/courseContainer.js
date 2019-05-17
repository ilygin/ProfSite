import React from 'react';
import {connect} from 'react-redux';
import CourseItem from '../blocks/courseItem';
import * as coursesActions from '../actions/courseActions';

class CourseContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		try {
			
			await this.props.loadCourses(!this.props.user.isAuth);
         } catch (e) {
			console.log('Error: ', e);
		}
	}

	render() {
		const list = this.props.courses.payload.map(item =>
			<CourseItem 
				key={item.id.toString()} 
				title={item.title} 
				id={item.id}/>
        );
		return (
			<div>
				<ul className="left-container__list-courses">
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