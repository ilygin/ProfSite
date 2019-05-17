import React from 'react';
import Settings from '../../dist/settings.svg';
import Search from '../../dist/search.svg';

class Header extends React.Component {
	constructor(props){
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }
    
    async onLogout(e)  {
		e.preventDefault();
		try {
			await this.props.logOut();
		}catch (error) {
			console.log(`Error: ${error}`);
		}
    }
    
	render() {
        let btnLogoutAndSettings = this.props.isAuth ? 
                            (
                                <React.Fragment>
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
