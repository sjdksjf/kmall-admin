/*
* @Author: TomChen
* @Date:   2018-08-24 14:39:19
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-25 09:20:01
*/
import { message } from 'antd';

import { request,setUserName } from 'util'
import { ADMIN_LOGIN } from 'api'

import * as types from './actionTypes.js'

const getLoginRequstAction = ()=>{
	return {
		type:types.LOGIN_REQUEST
	}
}

const getLoginDoneAction = ()=>{
	return {
		type:types.LOGIN_DONE
	}
}
export const getLoginAction = (values)=>{
	return (dispatch)=>{
		dispatch(getLoginRequstAction())
        request({
			method: 'post',
			url: ADMIN_LOGIN,
			data: values
		})
		.then((result)=>{
			//登录成功	
			if(result.code == 0){
				//存储用的信息在浏览
				setUserName(result.data.username)
				window.location.href = '/'
			}else if(result.code == 1){
				message.error(result.message)
			}
			dispatch(getLoginDoneAction())
		})
		.catch((err)=>{
			message.error('网络错误,请稍后在试!')
			dispatch(getLoginDoneAction())				
		})
	}
}