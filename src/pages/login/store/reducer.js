import * as types from './actionTypes.js';
const { fromJS } = require('immutable');
const defaultState = fromJS({
	isFetching:false
})

export default (state=defaultState,action)=>{

	if(action.type == types.LOGIN_ISFECTH){
		return state.set('isFetching',true)
	}
	if(action.type == types.CONMM_ISFECTH){
		return state.set('isFetching',false)
	}

	return state;
}