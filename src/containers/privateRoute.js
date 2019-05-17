import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as userAction from "../actions/userActions";

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.checkAuthorizationUser();
    }
    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route {...rest} render={
                props => {
                    console.log(rest)
                    return rest.isAuth ?
                        <Component {...props} /> : 
                        <Redirect
                            to={{
                                pathname: '/',
                                state: {from: props.location},
                            }}
                        />
                }}   
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.loginUser.isAuth
    }
};

const mapDispatchToProps = {
    ...userAction,
  };
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)



























