import React from 'react';
import { Link } from 'react-router-dom';

class PublicPage extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<Link to={'/main_page'}>Hello Public World!!!</Link>

			</div>
		)
	}
}

export default PublicPage;
