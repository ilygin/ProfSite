import React from 'react';
import {Link} from 'react-router-dom';
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
					
		const link = this.props.route || "/";
		return (
			
			<React.Fragment>
				<Link to={link}>
					<div className={itemStyle}>
						{itemImg}
						{this.props.item_name}
					</div>
				</Link>
			</React.Fragment>
		)
	}
}

export default MenuItem;
