
import React,{ Component } from 'react';
import { Breadcrumb,Form, Input,Select,Button,InputNumber } from 'antd';
import { connect } from 'react-redux'
import { actionCreator } from './store'

import Layout from 'common/layout'
import CategorySelector  from './category-selector.js'
import UploadImage from 'common/upload-image'
import RichEditor from 'common/rich-editor'

import  { UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAIL_IMAGE } from 'api'

const FormItem = Form.Item;
const Option = Select.Option;

class NormalProductSave extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			productId : this.props.match.params.productId
		}
	}
	componentDidMount(){
		if(this.state.productId){
			this.props.handleProductDetail(this.state.productId);
		}
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			values.id = this.state.productId;
		  	this.props.handleSave(err,values);
		});
	}	
	render(){
		const {
				parentCategoryId,
				categoryId,
				images,
				detail,
				name,
				description,
				price,
				stock,
			} = this.props;
		let fileList = [];	
		if(images){
			fileList = images.split(',').map((img,index)=>({
				uid: index,
				status: 'done',
				url: img,
				response:img
			}))
		}
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
						<Breadcrumb.Item>商品管理</Breadcrumb.Item>
						<Breadcrumb.Item>
							{
								this.state.productId
								? '编辑商品'
								: '添加商品'
							}
						</Breadcrumb.Item>
					</Breadcrumb>
					<Form style={{marginTop:30}}>
				        <FormItem
				          {...formItemLayout}
				          label="商品名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [
				            {
				              required: true, message: '请输入商品名称',
				            }],
				            initialValue:name
				          })(
				            <Input 
				            	placeholder="商品名称"
				            />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >
				          {getFieldDecorator('description', {
				            rules: [
				            {
				              required: true, message: '请输入商品描述',
				            }],
				            initialValue:description
				          })(
				            <Input 
				            	placeholder="商品描述"
				            />
				          )}
				        </FormItem>				        
				        <FormItem
				          {...formItemLayout}
				          label="所属分类"
				          required={true}
				          validateStatus={this.props.categoryIdValidateStatus}
				          help={this.props.categoryIdHelp}
				        >
				        	<CategorySelector
				        		parentCategoryId={parentCategoryId}
				        		categoryId={categoryId}
				        		getCategoryId={(parentCategoryId,categoryId)=>{
				        			this.props.handleCategory(parentCategoryId,categoryId)
				        		}}
				        	 />

				        </FormItem>	
				        <FormItem
				          {...formItemLayout}
				          label="商品价格"
				        >
				          {getFieldDecorator('price', {
				            rules: [
				            {
				              required: true, message: '请输入商品价格',
				            }],
				            initialValue:price
				          })(
				            <InputNumber 
				            	style={{width:300}}
				            	min={0}
								formatter={value => `${value}元`}
      							parser={value => value.replace('元', '')}				            	
				            />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品库存"
				        >
				          {getFieldDecorator('stock', {
				            rules: [
				            {
				              required: true, message: '请输入商品库存',
				            }],
				            initialValue:stock
				          })(
				            <InputNumber 
				            	style={{width:300}}
				            	min={0}
								formatter={value => `${value}件`}
      							parser={value => value.replace('件', '')}					            	
				            />
				          )}
				        </FormItem>	
				        <FormItem
				          {...formItemLayout}
				          label="商品图片"
				          required={true}
				          validateStatus={this.props.imagesValidateStatus}
				          help={this.props.imagesHelp}				          
				        >
							<UploadImage
								action={UPLOAD_PRODUCT_IMAGE}
								max={3}
								fileList={fileList}
								getFileList={
									(fileList)=>{
										this.props.handleImages(fileList)
									}
								}
							 />
				        </FormItem>	
				        <FormItem
				          {...formItemLayout}
				          label="商品详情"
				        >
							<RichEditor
								url = {UPLOAD_PRODUCT_DETAIL_IMAGE}
								getRichEditorValue = {(value)=>{
									this.props.handleDetail(value)
								}}
								detail={detail}
							 />
				        </FormItem>					        				        				        					        			        
				        <FormItem {...tailFormItemLayout}>
				        	<Button 
				          		type="primary"
				          		onClick={this.handleSubmit}
				          		loading={this.props.isSaveFetching}
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

const ProductSave = Form.create()(NormalProductSave);

const mapStateToProps = (state)=>{
	return {
		categoryIdValidateStatus:state.get('product').get('categoryIdValidateStatus'),
		categoryIdHelp:state.get('product').get('categoryIdHelp'),
		imagesValidateStatus:state.get('product').get('imagesValidateStatus'),
		imagesHelp:state.get('product').get('imagesHelp'),		
		isSaveFetching:state.get('product').get('isSaveFetching'),
		parentCategoryId:state.get('product').get('parentCategoryId'),
		categoryId:state.get('product').get('categoryId'),
		images:state.get('product').get('images'),
		detail:state.get('product').get('detail'),
		name:state.get('product').get('name'),
		description:state.get('product').get('description'),	
		price:state.get('product').get('price'),
		stock:state.get('product').get('stock'),			
	}
}

const mapDispatchToProps = (dispatch)=>{
	return{
		handleSave:(err,values)=>{
			dispatch(actionCreator.getSaveAction(err,values));
		},
		handleCategory:(parentCategoryId,categoryId)=>{
			dispatch(actionCreator.getSetCategoryAction(parentCategoryId,categoryId));
		},
		handleImages:(fileList)=>{
			dispatch(actionCreator.getSetImagesAction(fileList));
		},
		handleDetail:(value)=>{
			dispatch(actionCreator.getSetDetailAction(value));
		},
		handleProductDetail:(productId)=>{
			dispatch(actionCreator.getProductDetailAction(productId));
		}
	}
}



export default connect(mapStateToProps,mapDispatchToProps)(ProductSave);