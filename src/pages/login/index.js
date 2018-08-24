import React,{ Component } from 'react';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import { connect } from 'react-redux';
import * as actionCreator from './store/actionCreator.js';
const FormItem = Form.Item;

const axios = require('axios');

import './index.css';

class NormalLoginForm extends React.Component {
  constructor(props){
     super(props);
     this.handleSubmit = this.handleSubmit.bind(this);
  } 
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
        this.props.getLoginAction(values)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
     <div className="login">	
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入账号!' },{ pattern:/^[a-z|\d]{4,16}$/,message:'用户名为4-16个字符' }],
          })(
            <Input className="userName-i" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' },{pattern:/^[a-z|\d]{4,16}$/,message:'密码为4-16个字符'}],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
            
          <Button 
          type="primary"
          onClick = {this.handleSubmit} 
          htmlType="submit" 
          className="login-form-button"
          loading ={this.props.isFetching}
          >
             登陆
          </Button>
       
        </FormItem>
      </Form>
     </div> 
    );
  }
}

const Login = Form.create()(NormalLoginForm );
const mapStateToProps = (state)=>{
   return{
      isFetching:state.get('login').get('isFetching'),
   }
}

const mapDispatchToProps = (dispatch) =>{
  return{
       getLoginAction:(values)=>{
          const action = actionCreator.getInitDataAction(values);
          dispatch(action); 
       }  
      
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(Login);

