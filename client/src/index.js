import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Client from './apollo/Client';
import { ApolloProvider } from '@apollo/react-hooks'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

ReactDOM.render(
  <ApolloProvider client={Client}>
      <App />
  </ApolloProvider>,
  document.getElementById('root')
);