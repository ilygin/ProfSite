import React from 'react';
import { Link } from 'react-router-dom';

import LoginForm from '../blocks/sidebar/loginForm';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';
class PublicSidebar extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
        const {user, logInUser, signUpUser, checkAuthorizationUser} = this.props;
        
		return (
			<div  className={'sidebar'}>
                <Link to={"/main_page"}>
                    <div className={'sidebar__logo'}>
                        Logotype
                    </div>
                </Link>
                <LoginForm  logIn = {logInUser} 
                            user = {user}
                            signUp = {signUpUser}
                            checkAuthorizationUser={checkAuthorizationUser}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PublicSidebar);
