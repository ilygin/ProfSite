import React from 'react';
import Sidebar from '../blocks/sidebar/sidebar';
import Content from './mainPageContent/content';

class MainPage extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className={'main_page'}>
				<Sidebar />
				<Content />
			</div>
		)
	}
}

export default MainPage;
