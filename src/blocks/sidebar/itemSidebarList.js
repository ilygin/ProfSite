import React from 'react';

class ItemSidebar extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
        let itemStyle = this.props.id === 0 ?
                            'sidebarlist__first_item' :
                            'sidebarlist__item';
        
		return (
			<div className={itemStyle}>
                {this.props.item_name}
            </div>
		)
	}
}

export default ItemSidebar;
