import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import * as serviceWorker from './serviceWorker';
import './scss/index.scss';

ReactDOM.render(<Router />, document.getElementById('root'));

serviceWorker.register();
