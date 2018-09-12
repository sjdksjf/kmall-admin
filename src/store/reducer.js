/*
* @Author: TomChen
* @Date:   2018-08-21 14:55:31
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-31 16:09:00
*/
// import { combineReducers } from 'redux';
//redux-immutable中的combineReducers方法生成的store中的state数据是immutable对象
import { combineReducers } from 'redux-immutable';
import { reducer as loginReducer } from 'pages/login/store';
import { reducer as homeReducer } from 'pages/home/store';
import { reducer as userReducer } from 'pages/user/store';
import { reducer as categoryReducer } from 'pages/category/store';
import { reducer as productReducer } from 'pages/product/store';

export default combineReducers({
	login:loginReducer,
	home:homeReducer,
	user:userReducer,
	category:categoryReducer,
	product:productReducer
})