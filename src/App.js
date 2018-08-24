import React,{ Component } from 'react';
import Login from './pages/login';
import {
  //HashRouter  as Router,
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from 'react-router-dom';
//引入css
import './App.css';



class App extends Component{
   
   
  render(){
    //return 只能返回一个
    return(
     <Router>	
       <div className="App"> 

         <Route path="/login" component={Login} />       
       </div> 
     </Router>        
    )
  }
  


}

export default  App;