
import React,{ Component } from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux'

import { Breadcrumb,Button,Table,Divider,InputNumber,Modal,Input,Switch } from 'antd';
import { actionCreator } from './store'
import Layout from 'common/layout'
const Search = Input.Search;

class OrderList extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.handlePage(1);
	}
	render(){
		const { keyword } = this.props;
		const columns = [
			{
			  title: '订单号',
			  dataIndex: 'orderNo',
			  key: 'orderNo',
			  render:(orderNo)=>{
			  	if(keyword){
			  		let reg = new RegExp("("+keyword+")",'ig');
			  		let html = orderNo.replace(reg,"<b style='color:red'>$1</b>");
			  		return <span dangerouslySetInnerHTML={{__html:html}}></span>;
			  	}else{
			  		return orderNo;
			  	}
			  }
			}, 
			{
			  title: '收件人',
			  dataIndex: 'name',
			  key: 'name',
			},
			{
			  title: '支付金额',
			  dataIndex: 'prement',
			  key: 'prement',
			},
			{
			  title: '支付状态',
			  dataIndex: 'status',
			  key: 'status',
			},			
		
			{
				title: '操作',
				key: 'action',
				render: ( record) => (
					<span>
						<Link to={"/product/detail/"+record.id}>
						  	查看
						</Link>
					</span>
				),
			} 	 		 	
		];		
		const data  = this.props.list.map((order)=>{
			return {
				key:order.get('orderNo'),
				id:order.get('orderNo'),
				name:order.get('order').get('name'),
				prement:order.get('prement'),
				status:order.get('status')
			}
		}).toJS();		
		return(
			<Layout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>订单管理</Breadcrumb.Item>
						<Breadcrumb.Item>订单列表</Breadcrumb.Item>
					</Breadcrumb>
					<div style={{marginTop:10}} className="clearfix">
						<Search 
							style={{ width: 300 }}
							placeholder="请输入订单号"
							enterButton
							onSearch={value => {
								this.props.handleSearch(value)
							}}
						/>

					</div>
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
						loading={
							{
								spinning:this.props.isPageFetching,
								tip:'正在请求数据'
							}
						}
					/>
				</div>
			</Layout>
		)
	}

}
const mapStateToProps = (state)=>{
	return {
		isPageFetching:state.get('order').get('isPageFetching'),
		current:state.get('order').get('current'),
		total:state.get('order').get('total'),
		pageSize:state.get('order').get('pageSize'),
		list:state.get('order').get('list'),		
		keyword:state.get('order').get('keyword'),		
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		handlePage:(page)=>{
			dispatch(actionCreator.getPageAction(page));
		},
		handleOrder:(id,newOrder)=>{
			dispatch(actionCreator.getUpdateOrderAction(id,newOrder));
		},
		handleStatus:(id,newStatus)=>{
			dispatch(actionCreator.getUpdateStatusAction(id,newStatus));
		},
		handleSearch:(keyword,page)=>{
			dispatch(actionCreator.getSearchAction(keyword,page));
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(OrderList);