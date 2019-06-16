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
			console.log(`Error: ${error}`);
		}
    }

	async componentDidMount() {
		let {params} = this.props.pathParams;
        let editorState;
        let isAuthor = false;
		try{ 
			const data = await fetch(`${URL}/courseAPI/loadPage/${params.courseId}/${params.pageNumber}`);
            let content = await data.json();
			console.log(content)

            let contentRaw = convertFromRaw(JSON.parse(content.payload));
            editorState = EditorState.createWithContent(contentRaw);
		} catch(e) {
			editorState = EditorState.createEmpty();
		}	
		this.setState({editorState, isAuthor});
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
                <h3 className={'header__search_course'}>Название курса</h3>
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