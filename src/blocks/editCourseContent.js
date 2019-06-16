import React from 'react';
import {URL} from '../consts';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from 'react-router-dom';

export default class EditCoursePage extends React.Component {
	constructor(props){
        super(props);
        this.state = {
			editorState: EditorState.createEmpty(),
		};
        this.onSavePageContent = this.onSavePageContent.bind(this);
		this.onEditorStateChange = this.onEditorStateChange.bind(this);
	}

	async componentDidMount() {
		let {params} = this.props.pathParams;
		let editorState;
		try{ 
			const data = await fetch(`${URL}/courseAPI/loadPage/${params.courseId}/${params.pageNumber}`);
			let content = await data.json();
			let contentRaw = convertFromRaw(JSON.parse(content.payload));
			editorState = EditorState.createWithContent(contentRaw);
		} catch(e) {
			editorState = EditorState.createEmpty();
		}		
		this.setState({editorState});
	}
    
	render() { 
		let { editorState } = this.state;
		let link = `/edit_course/${this.props.pathParams.params.courseId}`
		return (
            <div className={'table_contents__content'}>
            <div className={'content__header'}>
				<Link to={link} >
					<button className='header__back_btn'>
                   		Назад
                	</button>
				</Link>
                <h3 className={'header__search'}>Название курса</h3>
                <button onClick={this.onSavePageContent} className={'header__save-page'}>Сохранить страницу</button>
                <button onClick={this.onLogout} className='header__logout' type='button'>
                    Выйти
                </button>
            </div>
              
            <div className={'table-contents_container'}> 
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        </div>

        )
    }
    async onSavePageContent(e) {
		e.preventDefault();
		let {params} = this.props.pathParams;

		let convertToRawEditorData = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
		try {
			let data = await fetch(`${URL}/courseAPI/savePage/`, {
				method: 'post',
				credentials: 'include',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					payload: convertToRawEditorData,
					courseId: params.courseId,
					pageNumber: params.pageNumber
				})
			});
		}catch (e) {
			console.error(e);
		}
	}

	onEditorStateChange(editorState) {
		this.setState({
			editorState,
		});
	}
}