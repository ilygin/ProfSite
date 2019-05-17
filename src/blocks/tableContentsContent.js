import React from 'react';
import Header from './tableContentsHeader';
import ContentList from './contentList';
export default class TableContentsContent extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className={'table_contents__content'}>
                <Header/>
                <ContentList/>
			</div>
		)
	}
}

