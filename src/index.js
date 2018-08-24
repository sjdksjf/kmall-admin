import React from 'react';
import ReactDOM from 'react-dom';
import store  from './store/index.js';

import { Provider } from 'react-redux';
import './index.css';
//自己定义的组建首字母必须大写
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Provider store={store}>
	<App />
    </Provider> 
	, document.getElementById('root'));
//registerServiceWorker();
