import React from 'react';
import Sidebar from '../blocks/sidebar/sidebar';
import Content from '../blocks/tableContentsContent';

export default class TableContentsPage extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className={'main_page'}>
				<Sidebar />
				<Content courseId = {this.props.match.params.id}/>
			</div>
		)
	}
}

