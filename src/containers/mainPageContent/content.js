import React from 'react';
import Header from '../../blocks/header';
import CourseContainer from '../courseContainer';

import { connect } from 'react-redux';
	
import * as userActions from '../../actions/userActions';

class Content extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		const {user, logOutUser} = this.props;
		return (
            <div className={'main_page__content'}>
			    		<Header isAuth={user.isAuth}
								logOut={logOutUser}/>
							<CourseContainer />
            </div>
		)
	}
}
const mapStateToProps = state => {
    return {
        user: state.loginUser
    }
};
const mapDispatchToProps = {
    ...userActions,
  };

export default connect(mapStateToProps, mapDispatchToProps)(Content);
