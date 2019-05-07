import React from 'react';

class MenuItem extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
        let itemStyle = this.props.id === 0 ?
                            'menu__item_first' :
                            'menu__item';
        
		return (
			<div className={itemStyle}>
                {this.props.item_name}
            </div>
		)
	}
}

export default MenuItem;
