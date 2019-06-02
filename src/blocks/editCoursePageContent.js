import React from 'react';
import {URL} from '../consts';
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

export default class EditCoursePage extends React.Component {
	constructor(props){
        super(props);
        this.state = {};
        this.onSavePageContent = this.onSavePageContent.bind(this);
		this.onEditorStateChange = this.onEditorStateChange.bind(this);
	}

	async componentDidMount() {	
		const data = await fetch(`${URL}/courseAPI/loadPage/1/1`);
		console.log(data)
		let content = await data.json();
		debugger;
		let contentRaw = convertFromRaw(JSON.parse(content.payload));
		let editorState = EditorState.createWithContent(contentRaw);
		this.setState({editorState});
	}
    
	render() { 
        let { editorState } = this.state;
		return (
            <div className={'table_contents__content'}>
            <div className={'content__header'}>
                <h3 className={'header__search'}>Название курса</h3>
                <button onClick={this.onSavePageContent} className={'header__save-course'}>Сохранить страницу</button>
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
					courseId: "1",
					pageNumber: "1"
				})
			});
		}catch (e) {
			console.log(e);
		}
	}

	onEditorStateChange(editorState) {
		this.setState({
			editorState,
		});
	}
}