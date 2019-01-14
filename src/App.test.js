import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';

it('renders App component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
