import React from 'react';
import Header from '../header';

class Content extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
            <div className={'main_page__content'}>
			    <Header />

            </div>
		)
	}
}

export default Content;
