
import { message } from 'antd';

import { request } from 'util'
import { 
	GET_ORDERS,
	GET_ORDER_DETAIL,
	SEARCH_ORDERS,
	UPDATE_ORDER_DELIVER 
} from 'api'

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
		dispatch(getPageRequstAction());
        request({
			method: 'get',
			url: GET_ORDERS,
			data: {
				page:page
			}
		})
		.then((result)=>{
			if(result.code == 0){
				dispatch(getSetPageAction(result.data))	
			}else{
				message.error(result.message)
			}
			dispatch(getPageDoneAction())
		})
		.catch((err)=>{
			message.error('网络错误,请稍后在试!')
			dispatch(getPageDoneAction())
		})
	}	
}

const setOrderDetail = (payload)=>({
	type:types.SET_ORDER_DETAIL,
	payload
})
export const getOrderDetailAction = (orderNo)=>{
	return (dispatch)=>{
        request({
			method: 'get',
			url: GET_ORDER_DETAIL,
			data: {
				orderNo:orderNo,
			}
		})
		.then((result)=>{
			if(result.code == 0){
				dispatch(setOrderDetail(result.data))
			}
		})
		.catch((err)=>{
			message.error('网络错误,请稍后在试!')
		})
	}	
}

export const getSearchAction = (keyword,page=1)=>{
	return (dispatch)=>{
        request({
			method: 'get',
			url: SEARCH_ORDERS,
			data: {
				keyword,
				page
			}
		})
		.then((result)=>{
			if(result.code == 0){
				dispatch(getSetPageAction(result.data))
			}else{
				message.error(result.message)
			}
		})
		.catch((err)=>{
			message.error('网络错误,请稍后在试!')
		})
	}	
}

export const getOrderDeliverAction = (orderNo)=>{
	return (dispatch)=>{
        request({
			method: 'put',
			url: UPDATE_ORDER_DELIVER,
			data: {
				orderNo:orderNo,
			}
		})
		.then((result)=>{
			if(result.code == 0){
				dispatch(setOrderDetail(result.data))
			}
		})
		.catch((err)=>{
			message.error('网络错误,请稍后在试!')
		})
	}	
}


