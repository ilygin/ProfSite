import React from 'react';
import Sidebar from '../blocks/sidebar/sidebar';
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
        // debugger;
		const {logOutUser, tableContent} = this.props;
        const PageContent = this.props.match.path.includes("/course/") ? 
        <TableContent courseId = {this.props.match.params.courseId}
            tableContent = {tableContent}
            logOut={logOutUser}/> :
        <Course pathParams = {this.props.match}/>;

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

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
