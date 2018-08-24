import React,{ Component } from 'react';
import { connect } from 'react-redux';

import { Input,Button,Row,Col,List } from 'antd';
//引入方法
import { actionCreator } from './store';



//引入css
import './Todolist.css';



class Todolist extends Component{
    componentDidMount(){
      //ajax 获取数据
        this.props.getdata(); 
   }



 
  render(){
    //return 只能返回一个
    return(
      <div className="Todolist">
          <Row>
            <Col span={18} ><Input 
             value= {this.props.value}
             onChange = {this.props.handleChenge}
            /> </Col>
            <Col span={6} ><Button 
            type="primary"
            onClick = {this.props.handleAdd}
            >增加</Button></Col>
          </Row>
          <List
            style={{ marginTop: 10 }}
            bordered
            dataSource={
               this.props.list
            }
            renderItem={(item,index) => (<List.Item onClick ={()=>{this.props.handleDelete(index)}}>{item}</List.Item>)}
          />                
      </div>        
    )
  }
  
}
const mapStateToProps = (state)=>{
   return{
      value:state.get('todolist').get('value'),
      list:state.get('todolist').get('list')
   }
}

const mapDispatchToProps = (dispatch) =>{
  return{
      handleChenge:(e)=>{
        const action = actionCreator.chageValueAction(e.target.value);
        dispatch(action);
      },

      handleAdd:()=>{
        const action = actionCreator.addItemAction();
        dispatch(action);  
      },

      handleDelete:(index)=>{
        const action = actionCreator.deleteItemAction(index);
        dispatch(action); 
      },
      getdata:()=>{
        const action = actionCreator.getInitDataAction();
        dispatch(action); 
      }

  }

}

export default connect(mapStateToProps,mapDispatchToProps)(Todolist);