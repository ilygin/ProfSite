import React from 'react';

class MenuItem extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
        let itemStyle = this.props.id === 0 ?
                            'menu__item_first' :
                            'menu__item';
        let itemImg =  this.props.imgSvg ?
						<div className={"item__icon"}><img src={this.props.imgSvg} alt="" /></div>:
						null;
					

		return (
			<div className={itemStyle}>
				{itemImg}
                {this.props.item_name}
            </div>
		)
	}
}

export default MenuItem;
