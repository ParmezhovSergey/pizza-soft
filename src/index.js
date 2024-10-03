import React from 'react';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {createRoot} from 'react-dom/client';
import {store} from './store/reduxStore'
import {BrowserRouter} from 'react-router-dom';

const reactRoot = createRoot(document.getElementById('root'));

reactRoot.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
);



