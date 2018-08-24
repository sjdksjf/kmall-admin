import * as types from './actionTypes.js';
import axios from 'axios';
import { LOGIN } from 'api';
import { message } from 'antd';//引入ant de里面的页面
import { request } from 'util';


export const getInitDataAction = (values)=>{
	return (dispatch)=>{
		  dispatch(loadInitDataAction());
	   request({
	   	  url: LOGIN,
	   	  method: 'post',
	   	  data: values
	   })
	   .then(result=>{
	   	dispatch(loginConmmAction());
	   		if (result.code == 0) {
	   			window.location.href = '/';

	   		}else if (result.code == 10) {

	   			message.error(result.message);
	   		}
	   })
	   .catch(err=>{
	   		message.error('网络错误，请稍后再试');
	   		dispatch(loadInitDataAction());
	   });
	}
}

export const loadInitDataAction = ()=>{
	return {
		type:types.LOGIN_ISFECTH,
	}
}

export const loginConmmAction = ()=>{
	return {
		type:types.CONMM_ISFECTH,
	}
}