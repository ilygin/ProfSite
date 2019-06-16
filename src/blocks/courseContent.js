import React from 'react';
import {URL} from '../consts';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from 'react-router-dom';

export default class CourseContent extends React.Component {
	constructor(props){
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            isAuthor: false
        };
        this.onLogout = this.onLogout.bind(this);        
    }
    
    onLogout(e)  {
		e.preventDefault();
		try {
			this.props.logOut();
		}catch (error) {
			console.error(`Error: ${error}`);
		}
    }

	async componentDidMount() {
		let {params} = this.props.pathParams;
        let editorState;
        let title = "Новый раздел";
		try{ 
			const data = await fetch(`${URL}/courseAPI/loadPage/${params.courseId}/${params.pageNumber}`);
            let content = await data.json();
            let contentRaw = convertFromRaw(JSON.parse(content.payload.content));
            editorState = EditorState.createWithContent(contentRaw);
            let tableTitlesJSON = content.payload.table;
            let tableTitles = JSON.parse(tableTitlesJSON);
            title = tableTitles.sections[params.pageNumber-1].title;
		} catch(e) {
            console.error(e)
			editorState = EditorState.createEmpty();
		}	
		this.setState({editorState, title});
	}
    
	render() {

		let { editorState } = this.state;
        let link = `/course/${this.props.pathParams.params.courseId}`;
        const logoutButton = this.props.isAuth ? 
            <button onClick={this.onLogout} className='header__logout' type='button'>
                Выйти
            </button> : null;
		return (
            <div className={'table_contents__content'}>
            <div className={'content__header'}>
				<Link to={link} >
					<button className='header__back_btn'>
                   		Назад
                	</button>
				</Link>
                <h3 className={'header__search_course'}>{this.state.title}</h3>
                {logoutButton}
            </div>
              
            <div className={'course-content_container'}> 
                <Editor
                    toolbarHidden
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorState={editorState}
                    readOnly = {true}
                />
            </div>
        </div>

        )
    }
}