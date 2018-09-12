/*
* @Author: TomChen
* @Date:   2018-08-31 10:49:51
* @Last Modified by:   TomChen
* @Last Modified time: 2018-09-03 15:09:38
*/
import React,{ Component } from 'react';

import Simditor from 'simditor';

import $ from 'jquery';

import 'simditor/styles/simditor.css';
import './index.css'

class RichEditor extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLoaded : false
		}
		this.toolbar = [
			'title',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'fontScale',
			'color',
			'ol',
			'ul',
			'blockquote',
			'code',
			'table',
			'link',
			'image',
			'hr',
			'indent',
			'outdent',
			'alignment'
		]
		//jquery ajax跨域携带cookie设置
		$.ajaxSetup({
			xhrFields:{
				withCredentials:true
			}
		})
	}

	componentDidMount(){
		this.editor = new Simditor({
		  textarea: $(this.textarea),
		  toolbar:this.toolbar,
		  upload:{
		  	url: this.props.url,
		  	fileKey: 'upload'
		  }
		});
		this.editor.on('valuechanged',()=>{
			this.setState({
				isLoaded:true
			},()=>{
				this.props.getRichEditorValue(this.editor.getValue())
			})
		})
	}
	componentDidUpdate(){
		if(this.props.detail && !this.state.isLoaded){
			this.editor.setValue(this.props.detail)
			this.setState({
				isLoaded:true
			})
		}
	}
	render(){
		return(
			<div>
				<textarea ref={(textarea)=>{this.textarea = textarea}}></textarea>
			</div>
		)
	}
}

export default RichEditor;