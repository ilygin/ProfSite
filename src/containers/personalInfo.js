import React from 'react';


class Person extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className={'sidebar__person'}>
                <div className={'person__photo'}></div>
                <div className={'pearson__name'}>
                    Igor 
                    Lygin
                </div>
            </div>
		)
	}
}

export default Person;
