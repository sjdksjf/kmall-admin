/*
* @Author: TomChen
* @Date:   2018-08-24 17:02:20
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-28 16:23:35
*/
import React,{ Component } from 'react';
import { Table,Breadcrumb } from 'antd';
import { connect } from 'react-redux'
import moment from 'moment';

import Layout from 'common/layout'
import { actionCreator } from './store'

const columns = [
	{
	  title: '用户名',
	  dataIndex: 'username',
	  key: 'username',
	}, 
	{
	  title: '是否管理员',
	  dataIndex: 'isAdmin',
	  key: 'isAdmin',
	  render: isAdmin => (isAdmin ? '是' : '否'  )
	},
	{
	  title: '邮箱',
	  dataIndex: 'email',
	  key: 'email',
	},
	{
	  title: '手机',
	  dataIndex: 'phone',
	  key: 'phone',
	},
	{
	  title: '注册时间',
	  dataIndex: 'createdAt',
	  key: 'createdAt',
	}, 	 		 	
];


class User extends Component{

	componentDidMount(){
		this.props.handlePage(1);
	}

	render(){
		const data  = this.props.list.map((user)=>{
			return {
				key:user.get('_id'),
				username:user.get('username'),
				isAdmin:user.get('isAdmin'),
				phone:user.get('phone'),
				email:user.get('email'),
				createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss') 
			}
		}).toJS();
		return(
			<div>
				<Layout>
					<Breadcrumb>
						<Breadcrumb.Item>用户管理</Breadcrumb.Item>
						<Breadcrumb.Item>用户列表</Breadcrumb.Item>
					</Breadcrumb>				
					<Table 
						dataSource={data} 
						columns={columns} 
						pagination={
							{
								current:this.props.current,
								defaultCurrent:this.props.current,
								total:this.props.total,
								pageSize:this.props.pageSize
							}
						}
						onChange = {(pagination)=>{
							this.props.handlePage(pagination.current)
						}}
						loading={
							{
								spinning:this.props.isFetching,
								tip:'正在请求数据'
							}
						}
					/>
				</Layout>
			</div>
		)
	}
}
const mapStateToProps = (state)=>{
	return {
		isFetching:state.get('user').get('isFetching'),
		current:state.get('user').get('current'),
		total:state.get('user').get('total'),
		pageSize:state.get('user').get('pageSize'),
		list:state.get('user').get('list')		
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		handlePage:(page)=>{
			dispatch(actionCreator.getPageAction(page));
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(User);