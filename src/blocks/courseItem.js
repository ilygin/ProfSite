import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class CourseItem extends Component {
    render() {
        const { title, id} = this.props;
        let link = "/course/" + id + "/1";
        return (
            <Link to={link} className="link-course">
                <li className="list-courses__item">
                    <h3 className="card-title">{title}</h3>
                </li>
            </Link>
        )
    }
}