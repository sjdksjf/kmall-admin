import React,{ Component } from 'react';
import { Switch,Route } from 'react-router-dom';

import OrderList from './list.js'
import OrderDetail from './detail.js'

class Order extends Component{
	render(){
		return(
			<Switch>
				<Route path="/Order/detail/:orderOn" component={ OrderDetail } />
				<Route path="/Order" component={ OrderList } />
			</Switch>
		)
	}
}

export default Order;