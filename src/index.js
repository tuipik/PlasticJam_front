import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import presets from './helper/presets'

axios.defaults.baseURL = presets.SERVER_URL + '/api';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker();
