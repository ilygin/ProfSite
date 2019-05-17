import React from 'react';

export default class TableContentsHeader extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className={'table_contents__content'}>
                <input type="text" placeholder="Введите название курса"/>
                <button>Сохранить курс</button>
			</div>
		)
	}
}

