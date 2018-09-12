/*
* @Author: TomChen
* @Date:   2018-08-24 14:39:19
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-27 11:33:20
*/
import { message } from 'antd';

import { request } from 'util'
import { GET_USERS } from 'api'

import * as types from './actionTypes.js'

const getPageRequstAction = ()=>{
	return {
		type:types.PAGE_REQUEST
	}
}

const getPageDoneAction = ()=>{
	return {
		type:types.PAGE_DONE
	}
}
const getSetPageAction = (payload)=>{
	return {
		type:types.SET_PAGE,
		payload
	}
}
export const getPageAction = (page)=>{
	return (dispatch)=>{
		dispatch(getPageRequstAction())
        request({
			method: 'get',
			url: GET_USERS,
			data: {
				page:page
			}
		})
		.then((result)=>{
			if(result.code == 0){
				dispatch(getSetPageAction(result.data))
			}else{
				message.error('服务器错误,请稍后在试!')
			}
			dispatch(getPageDoneAction())
		})
		.catch((err)=>{
			message.error('网络错误,请稍后在试!')
			dispatch(getPageDoneAction())				
		})
	}
}