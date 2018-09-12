/*
* @Author: TomChen
* @Date:   2018-08-27 15:19:33
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-30 14:42:49
*/
import React,{ Component } from 'react';
import { Breadcrumb,Form, Input,Select,Button } from 'antd';
import { connect } from 'react-redux'
import { actionCreator } from './store'

import Layout from 'common/layout'


const FormItem = Form.Item;
const Option = Select.Option;

class NormalCategoryAdd extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount(){
		this.props.getLevelOneCategories();
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		  	this.props.handleAdd(values);
		  }
		});
	}	
	render(){
		const { getFieldDecorator } = this.props.form;
	    const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 2 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 22 },
	      },
	    };
	    const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 16,
	          offset: 2,
	        },
	      },
	    };	
		return(
			<Layout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>分类管理</Breadcrumb.Item>
						<Breadcrumb.Item>添加分类</Breadcrumb.Item>
					</Breadcrumb>
					<Form style={{marginTop:30}}>
				        <FormItem
				          {...formItemLayout}
				          label="分类名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [
				            {
				              required: true, message: '请输入分类名称',
				            }],
				          })(
				            <Input 
				            	style={{ width: 300 }} 
				            	placeholder="分类名称"
				            />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="分类名称"
				        >
				          {getFieldDecorator('pid', {
				            rules: [
				            {
				              required: true, message: '请输选择父级分类',
				            }],
				          })(
						    <Select initialValue="0" style={{ width: 300 }}>
						      <Option value="0">根分类</Option>
						      {
						      	this.props.levelOneCategories.map((category)=>{
						      		return <Option key={category.get('_id')} value={category.get('_id')}>根分类/{category.get('name')}</Option>
						      	})
						      }
						    </Select>
				          )}
				        </FormItem>				        
				        <FormItem {...tailFormItemLayout}>
				        	<Button 
				          		type="primary"
				          		onClick={this.handleSubmit}
				          		loading={this.props.isAddFetching}
				          	>
				          	提交
				        	</Button>
				        </FormItem>				        					
					</Form>
				</div>
			</Layout>
		)
	}

}

const CategoryAdd = Form.create()(NormalCategoryAdd);

const mapStateToProps = (state)=>{
	return {
		isAddFetching:state.get('category').get('isAddFetching'),
		levelOneCategories:state.get('category').get('levelOneCategories')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		handleAdd:(values)=>{
			dispatch(actionCreator.getAddAction(values));
		},
		getLevelOneCategories:()=>{
			dispatch(actionCreator.getLevelOneCategoriesAction());
		}
	}
}



export default connect(mapStateToProps,mapDispatchToProps)(CategoryAdd);