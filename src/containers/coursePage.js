import React from 'react';
import Sidebar from '../blocks/sidebar/sidebar';
import PublicSidebar from '../containers/publicSidebar'
import TableContent from '../blocks/tableContent';
import Course from '../blocks/courseContent';
import {connect} from 'react-redux';
import * as saveCourseActions from '../actions/saveCourseActions';
import * as userActions from '../actions/userActions';

class CoursePage extends React.Component {
	constructor(props){
		super(props);
	}

	
	render() {
        debugger;
		const {logOutUser, tableContent, isAuth} = this.props;
        const PageContent = this.props.match.path.includes("/course/") ? 
        <TableContent courseId = {this.props.match.params.courseId}
            tableContent = {tableContent}
            logOut={logOutUser}
			isAuth={isAuth}/> :
        <Course pathParams = {this.props.match}
				isAuth={isAuth}/>;
		let CourseSidebar = isAuth ? <Sidebar/> : <PublicSidebar/>;
		return (
			<div className={'main_page'}>
				{CourseSidebar}
                {PageContent}
			</div>
		)
	}

}

const mapStateToProps = state => {
    return {
		editCourseStatus: state.editCourseStatus,
		isAuth: state.loginUser.isAuth
    }
};

const mapDispatchToProps = {
	...saveCourseActions,
	...userActions,
  };

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
