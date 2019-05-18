import React from 'react';
import Settings from '../../dist/settings.svg';
import Search from '../../dist/search.svg';
import { Link } from 'react-router-dom';
import {URL} from '../consts';
class Header extends React.Component {
	constructor(props){
        super(props);
        this.state={
            lastCourseId: -1
        }
        this.onLogout = this.onLogout.bind(this);
    }
    
    onLogout(e)  {
		e.preventDefault();
		try {
			this.props.logOut();
		}catch (error) {
			console.log(`Error: ${error}`);
		}
    }
    async componentDidMount() {
		try {
			let lastCourseIdRequest = await fetch(`${URL}/courseAPI/lastCourseId`);
            const lastCourseIdJson = await lastCourseIdRequest.json();
            let lastCourseId = lastCourseIdJson[0]["max(`id`)"] + 1;
            this.setState({lastCourseId}); 
		} catch (e) {
			console.log('Error: ', e);
		}
    }
    
	render() {
        let btnLogoutAndSettings = this.props.isAuth ? 
                            (
                                <React.Fragment>
                                    <Link to={"/editCourse/" + this.state.lastCourseId}>
                                        <button type='button' onClick>
                                            Создать курс
                                        </button>
                                    </Link>
                                                            
                                    <button className='header__settings' type='button'>
                                        <img src={Settings} alt="" />
                                    </button>
                                    <button onClick={this.onLogout} className='header__logout' type='button'>
                                        Выйти
                                    </button>
                                </React.Fragment>
                            ) : <div/>
		return (
            <div className={'content__header'}>
                <img src={Search} alt="" />
                <input type='text' placeholder='Поиск ...' className={'header__search'}/>
                {btnLogoutAndSettings}
            </div>
		)
	}
}

export default Header;
