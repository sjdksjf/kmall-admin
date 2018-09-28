
import React,{ Component } from 'react';
import { Switch,Route } from 'react-router-dom';

import ProductList from './list.js'
import ProductSave from './save.js'
import ProductDetail from './detail.js'

class Product extends Component{
	render(){
		return(
			<Switch>
				<Route path="/product/save/:productId?" component={ ProductSave } />
				<Route path="/product/detail/:productId" component={ ProductDetail } />
				<Route path="/product" component={ ProductList } />
			</Switch>
		)
	}
}

export default Product;