import React from 'react';
import content from '../containers/mainPageContent/content';

export default class ContentList extends React.Component {
	constructor(props){
        super(props);
        this.state = {
            units: ["Модуль 1", "Модуль 2"],
            sections: [{
                title: "Раздел 1.1",
                unitId: 0,
                id: 1
            },
            {
                title: "Раздел 1.2",
                unitId: 0,
                id: 1
            },
            {
                title: "Раздел 2.1",
                unitId: 1,
                id: 3
            }
        ]
        }
        this.createUnit = this.createUnit.bind(this);
	}

    createUnit() {
        let currentUnitsLength = this.state.units.length+1;
        let newelement = `${currentUnitsLength}. Новый модуль`;

        this.setState(prevState => ({
            units: [...prevState.units, newelement]
        }))
    }
    createSection(unitId) { 
        let currentsectionsLength = this.state.sections.length+1;
        let newelement = {
            title: `Новый раздел ${currentsectionsLength}`,
            unitId,
            id: currentsectionsLength
        }
        this.setState(prevState => ({
            sections: [...prevState.sections, newelement]
        }))
      }

	render() {
        let contentList = this.state.units.map((item,index)=> {
            debugger
                let currentLi = this.state.sections.filter(section => section.unitId === index);
                currentLi = currentLi.sort((a,b)=> (a.id - b.id));
                let currentLiList = currentLi.map(section => <li>{section.title} </li>)
                return(
                    <ul>
                        <li>{item}</li>
                        {currentLiList}
                        <button onClick={this.createSection.bind(this, index)}>Создать section</button>
                    </ul>
                )
        })
        debugger;
		return (
			<div className={'table_contents__content'}>
                <div>
                    <ul>
                        
                        {contentList}
                    </ul>

                </div>
                <button onClick={this.createUnit}>Создать главу</button>

			</div>
		)
	}
}

