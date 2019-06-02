import React from 'react';
import Sidebar from '../blocks/sidebar/sidebar';
import TableContent from '../blocks/tableContentsContent';
import EditCoursePage from '../blocks/editCoursePageContent';
import {connect} from 'react-redux';
import * as saveCourseActions from '../actions/saveCourseActions';
import * as userActions from '../actions/userActions';

class TableContentsPage extends React.Component {
	constructor(props){
		super(props);
	}

	
	render() {
		console.group(`this.props.match.params:`);
			console.log(this.props.match);
		console.groupEnd(`this.props.match.params:`);

		const {editCourseStatus, logOutUser, saveCourseChange, tableContent} = this.props;
		const PageContent = this.props.match.path.includes("/edit_course/") ? 
			<TableContent courseId = {this.props.match.params.id}
				editCourseStatus = {editCourseStatus}
				saveCourseChange = {saveCourseChange}
				tableContent = {tableContent}
				logOut={logOutUser}/> :
			<EditCoursePage pathParams = {this.props.match}/>;
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

export default connect(mapStateToProps, mapDispatchToProps)(TableContentsPage);
