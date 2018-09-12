/*
* @Author: TomChen
* @Date:   2018-08-25 14:40:08
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-25 14:44:04
*/
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