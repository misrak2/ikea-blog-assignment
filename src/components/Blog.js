import React, { Component } from 'react';
import './Blog.css';

class Blog extends Component {

  constructor(prop) {
    super(prop)

    this.state = {
      title: '',
      message: '',
      lastUpdated: '',
    }
  }

  componentDidMount() {
    const post = JSON.parse(localStorage.getItem('Post'));
    const _lastUpdated = this.lastUpdatedTime();
    this.setState(post);
    this.setState({lastUpdated: _lastUpdated})
  }

  lastUpdatedTime(){
    return JSON.parse(localStorage.getItem('Time'));
  }

  nextPath(path, e) {
  if(e.target && e.target.value === 'remove'){
    localStorage.clear();
  }
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="blog">
        <h1>{this.state.title}</h1>
        <span>Last updated: {this.state.lastUpdated}</span>
        <span>{this.state.message}</span>
        <button value='edit' onClick={(e) => this.nextPath('/', e)}>Edit</button>
        <button value='remove' onClick={(e) => this.nextPath('/',e)}>Remove</button>
      </div>
    );
  }

}

export default Blog;
