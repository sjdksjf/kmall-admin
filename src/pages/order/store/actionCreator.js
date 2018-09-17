
import { message } from 'antd';

import { request } from 'util'
import { 
	SAVE_PRODUCT,
	GET_ORDERS,
	UPDATE_PRODUCT_ORDER,
	UPDATE_PRODUCT_STATUS,
	GET_PRODUCT_DETAIL,
	SEARCH_PRODUCTS 
} from 'api'

import * as types from './actionTypes.js'

export const getSetCategoryAction = (parentCategoryId,categoryId)=>({
	type:types.SET_CATEGORY,
	payload:{
		parentCategoryId,
		categoryId
	}
})
export const getSetImagesAction = (fileList)=>({
	type:types.SET_IMAGES,
	payload:fileList
})
export const getSetDetailAction = (value)=>({
	type:types.SET_DETAIL,
	payload:value
})




const getSaveRequstAction = ()=>{
	return {
		type:types.SAVE_REQUEST
	}
}

const getSaveDoneAction = ()=>{
	return {
		type:types.SAVE_DONE
	}
}

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
const setCategoryError = ()=>({
	type:types.SET_CATEGORY_ERROR
})
const setImagesError = ()=>({
	type:types.SET_IMAGES_ERROR
})



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


export const getUpdateStatusAction = (id,newStatus)=>{
	return (dispatch,getState)=>{
		const state = getState().get('product');
        request({
			method: 'put',
			url: UPDATE_PRODUCT_STATUS,
			data: {
				id:id,
				status:newStatus,
				page:state.get('current')
			}
		})
		.then((result)=>{
			if(result.code == 0){
				message.success(result.message)
			}else{
				message.error(result.message)
				dispatch(getSetPageAction(result.data))
			}
		})
		.catch((err)=>{
			message.error('网络错误,请稍后在试!')
		})
	}	
}


const setProductDetail = (payload)=>({
	type:types.SET_PRODUCT_DETAIL,
	payload
})
export const getProductDetailAction = (productId)=>{
	return (dispatch)=>{
        request({
			method: 'get',
			url: GET_PRODUCT_DETAIL,
			data: {
				id:productId,
			}
		})
		.then((result)=>{
			if(result.code == 0){
				dispatch(setProductDetail(result.data))
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
			url: SEARCH_PRODUCTS,
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

