import * as types from './actionTypes.js';
const { fromJS } = require('immutable');
const defaultState = fromJS({
	value:'',
	list:[]
})

export default (state=defaultState,action)=>{
	if(action.type == types.CHANGE_VALUE){
       return state.set('value',action.payload)
		
	}
	if(action.type == types.LOAD_INIT_DATA){

		return state.set('list',action.payload)
	}	
	if(action.type == types.ADD_ITEM){
		
		const newList = [...state.get('list'),state.get('value')];
		return state.merge({
			list:newList,
			value:''
		})
	}

	if(action.type == types.DELETE_ITEM){

		const newList = [...state.get('list')];
		newList.splice(action.payload,1);
		return state.set('list',newList);
	}
	return state;
}