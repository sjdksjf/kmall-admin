
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

//用fromJS包装一个immutable对象
const defaultState = fromJS({	
	isPageFetching:false,
	current:0,
	total:0,
	pageSize:0,
	list:[],
	keyword:'',
	orderDetail:{}	
})

export default (state=defaultState,action)=>{

	if(action.type === types.SET_PAGE){
		return state.merge({
			current:action.payload.current,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			keyword:action.payload.keyword || '',
			list:fromJS(action.payload.list)
		})
	}

	if(action.type === types.PAGE_REQUEST){
		return state.set('isPageFetching',true)
	}

	if(action.type === types.PAGE_DONE){
		return state.set('isPageFetching',false)
	}

	if(action.type === types.SET_ORDER_DETAIL){
		return state.set('orderDetail',action.payload)		
	}
	
	return state;
}