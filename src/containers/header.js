import React from 'react';
import Settings from '../../dist/settings.svg';
import Search from '../../dist/search.svg';

class Header extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
            <div className={'content__header'}>
                <img src={Search} alt="" />
                <input type='text' placeholder='Поиск ...' className={'header__search'}/>
                <button className='header__settings' type='button'>
                    <img width={'28px'} src={Settings} alt="" />
                </button>
                <button className='header__logout' type='button'>
                    Выйти
                </button>
            </div>
		)
	}
}

export default Header;
