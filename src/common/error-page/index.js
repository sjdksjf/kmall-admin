
import React,{ Component } from 'react';
import { Alert } from 'antd';
import { Link } from 'react-router-dom';

import './index.css'
class ErrorPage extends Component{
	render(){
		return(
			<div className="ErrorPage">
			   <Alert message="页面走丢啦!!!!" type="error" />
			   <Link to="/">返回首页</Link>
			</div>
		)
	}
}

export default ErrorPage;