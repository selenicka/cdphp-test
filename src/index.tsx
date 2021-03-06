import React from 'react';
import ReactDOM from 'react-dom';
import UniverseApp from './UniverseApp';
import * as serviceWorker from './serviceWorker';
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';

ReactDOM.render(<UniverseApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
