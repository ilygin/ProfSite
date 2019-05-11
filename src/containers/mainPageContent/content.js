import React from 'react';
import Header from '../header';
import { connect } from 'react-redux';
	
import * as userActions from '../../actions/user';

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
