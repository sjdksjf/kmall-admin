/*
* @Author: TomChen
* @Date:   2018-08-20 09:18:25
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-30 09:51:14
*/
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

//用fromJS包装一个immutable对象
const defaultState = fromJS({
	isAddFetching:false,
	levelOneCategories:[],
	isPageFetching:false,
	current:0,
	total:0,
	pageSize:0,
	list:[],
	updateModalVisible:false,
	updateId:'',
	updateName:''		
})

export default (state=defaultState,action)=>{
	
	if(action.type === types.ADD_REQUEST){
		return state.set('isAddFetching',true)
	}

	if(action.type === types.ADD_DONE){
		return state.set('isAddFetching',false)
	}
	if(action.type === types.SET_LEVEL_ONE_CATEGORIES){
		return state.set('levelOneCategories',fromJS(action.payload))
	}	
	
	if(action.type === types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)
		})
	}

	if(action.type === types.PAGE_REQUEST){
		return state.set('isPageFetching',true)
	}

	if(action.type === types.PAGE_DONE){
		return state.set('isPageFetching',false)
	}

	if(action.type === types.SHOW_UPDATE_MODAL){
		return state.merge({
			updateModalVisible:true,
			updateId:action.payload.updateId,
			updateName:action.payload.updateName,
		})		
	}
	if(action.type === types.CLOSE_UPDATE_MODAL){
		return state.set('updateModalVisible',false);
	}
	if(action.type === types.CHANGE_NAME){
		return state.set('updateName',action.payload)
	}

	return state;
}