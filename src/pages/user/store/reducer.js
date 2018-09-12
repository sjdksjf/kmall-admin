/*
* @Author: TomChen
* @Date:   2018-08-20 09:18:25
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-28 15:48:40
*/
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

//用fromJS包装一个immutable对象
const defaultState = fromJS({
	isFetching:false,
	current:0,
	total:0,
	pageSize:0,
	list:[]	//immutable对象List	
})

export default (state=defaultState,action)=>{
	
	if(action.type === types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)
		})
	}

	if(action.type === types.PAGE_REQUEST){
		return state.set('isFetching',true)
	}

	if(action.type === types.PAGE_DONE){
		return state.set('isFetching',false)
	}

	return state;
}