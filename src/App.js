import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Blog from './components/Blog';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Route path="/" component={ Home } exact />
                <Route path="/blog" component={ Blog } />
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
