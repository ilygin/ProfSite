import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {URL} from '../consts';
export default class CourseItem extends Component {
    constructor(props){
        super(props);
        this.state = {};    
		this.onClickDeleteCourse = this.onClickDeleteCourse.bind(this);
    }
    
    async onClickDeleteCourse() {
        let userAccess = confirm("Вы дейстивтельно хотите удалить данный курс?")
        if (userAccess) {
            try {
                debugger;
                await fetch(`${URL}/courseAPI/deleteCourse/${this.props.id}`);            
            }catch(e) {
                
                console.error(e);
                debugger;
            }
        }
    }

    render() {
        const { title, id} = this.props;
        let link = "/course/" + id;
        console.log(this.props);
        debugger
        let deleteButton = !this.props.isAuthor ?
            <button className={'item__delete-course'} onClick={this.onClickDeleteCourse}>
                Удалить
            </button>:null;

        return (
            <div  className="link-course">
                <Link to={link}>
                    <li className="list-courses__item">
                        <h3 className="card-title">{title}</h3>
                    </li>
                </Link>
                {deleteButton}
            </div>
        )
    }
}