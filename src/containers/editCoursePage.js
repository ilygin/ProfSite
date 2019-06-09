import React from 'react';
import Sidebar from '../blocks/sidebar/sidebar';
import EditTableContent from '../blocks/editTableContent';
import EditCourse from '../blocks/editCourseContent';
import {connect} from 'react-redux';
import * as saveCourseActions from '../actions/saveCourseActions';
import * as userActions from '../actions/userActions';

class EditCoursePage extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		const {editCourseStatus, logOutUser, saveCourseChange, tableContent} = this.props;
		const PageContent = this.props.match.path.includes("/edit_course/") ? 
			<EditTableContent courseId = {this.props.match.params.id}
				editCourseStatus = {editCourseStatus}
				saveCourseChange = {saveCourseChange}
				tableContent = {tableContent}
				logOut={logOutUser}/> :
			<EditCourse pathParams = {this.props.match}/>;
		return (
			<div className={'main_page'}>
				<Sidebar />
				{PageContent}
			</div>
		)
	}

}

const mapStateToProps = state => {
    return {
		editCourseStatus: state.editCourseStatus,
    }
};

const mapDispatchToProps = {
	...saveCourseActions,
	...userActions,
  };

export default connect(mapStateToProps, mapDispatchToProps)(EditCoursePage);
