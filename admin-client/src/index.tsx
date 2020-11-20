// @ts-ignore
import babelPolyfill from  'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import {Provider} from 'react-redux'
import store from './store'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';

console.log(process.env)

ReactDOM.render(
<Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <App/>
    </LocaleProvider>
</Provider>
, document.getElementById('root'));
