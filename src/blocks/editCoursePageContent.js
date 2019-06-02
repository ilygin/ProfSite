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

	componentDidMount() {	
		// const {typePage} = this.props.pathParams;
		// let titlePlaceholder = this.chooseTitlePage(typePage); 
		// this.setState({titlePlaceholder});
	}

	componentWillReceiveProps(nextProps) {
		// const {typePage, pageNumber} = nextProps.pathParams;
		// const {courseDataItems} = nextProps.courseData;
		// let newTitle = this.state.titleValue;
		// let editorState;
		// if (courseDataItems !== undefined && courseDataItems[pageNumber] !== undefined) {
		// 	const {title, pageContent} = courseDataItems[pageNumber];
		// 	newTitle = title;
		// 	let content = convertFromRaw(JSON.parse(pageContent));
		// 	editorState = EditorState.createWithContent(content);
		// }else {
		// 	newTitle = this.chooseTitlePage(typePage)
		// }
		// this.setState({
		// 	editorState,
		// 	titleValue: newTitle 
		// })
    }
    
	render() { 
        let { editorState, titlePlaceholder, titleValue } = this.state;
		return (
            <div className={'table_contents__content'}>
            <div className={'content__header'}>
                <h3 className={'header__search'}>Название курса</h3>
                <button onClick={this.onSaveCourse} className={'header__save-course'}>Сохранить страницу</button>
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
    onSavePageContent(e) {
		e.preventDefault();
		// let title = document.querySelector(".titleCourse").value;
		// let convertToRawEditorData = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));

		// try {
		// 	this.props.savePageData(title, convertToRawEditorData, this.props.pathParams.courseId, this.props.pathParams.pageNumber);
		// }catch (e) {
		// 	console.log(e);
		// }
	}

	onEditorStateChange(editorState) {
		this.setState({
			editorState,
		});
	}
}