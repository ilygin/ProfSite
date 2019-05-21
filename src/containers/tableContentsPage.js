import React from 'react';
import Sidebar from '../blocks/sidebar/sidebar';
import Content from '../blocks/tableContentsContent';
import {connect} from 'react-redux';
import * as saveCourseActions from '../actions/saveCourseActions';
import * as userActions from '../actions/userActions';

class TableContentsPage extends React.Component {
	constructor(props){
		super(props);
	}

	
	render() {
		const {editCourseStatus, logOutUser, saveCourseChange, tableContent} = this.props;
		return (
			<div className={'main_page'}>
				<Sidebar />
				<Content courseId = {this.props.match.params.id}
						 editCourseStatus = {editCourseStatus}
						 saveCourseChange = {saveCourseChange}
						 tableContent = {tableContent}
						 logOut={logOutUser}/>
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
