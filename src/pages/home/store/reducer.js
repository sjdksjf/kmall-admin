/*
* @Author: TomChen
* @Date:   2018-08-20 09:18:25
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-25 15:19:59
*/
import { fromJS } from 'immutable'

import * as types from './actionTypes.js'

//用fromJS包装一个immutable对象
const defaultState = fromJS({
	usernum:200,
	ordernum:201,
	productnum:202
})

export default (state=defaultState,action)=>{
	
	if(action.type ==  types.SET_COUNT){
		return state.merge({
			usernum:action.payload.usernum,
			ordernum:action.payload.ordernum,
			productnum:action.payload.productnum			
		})
	}
	return state;
}