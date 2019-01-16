import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Add from './components/Add';
import Blog from './components/Blogs';
import Edit from './components/Edit';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <Route path="/blogs" component={ Blog } exact />
            <Route path="/add-blog" component={ Add } />
            <Route path="/edit-blog/:id" component={ Edit } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
