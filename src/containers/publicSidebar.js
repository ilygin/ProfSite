import React from 'react';
import LoginForm from '../blocks/sidebar/loginForm';
import { connect } from 'react-redux';
import * as userActions from '../actions/userActions';
class PublicSidebar extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
        const {user, logInUser, signUpUser} = this.props;
        
		return (
			<div  className={'sidebar'}>
                <div className={'sidebar__logo'}>
                    Logotype
                </div>
                <LoginForm  logIn = {logInUser} 
                            user = {user}
                            signUp = {signUpUser}/>
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
