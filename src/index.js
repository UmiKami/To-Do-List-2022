import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Layout from './Layout';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Layout />
    </Provider>
);

