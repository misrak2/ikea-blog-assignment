import React, { Component } from 'react';
import './Add.css';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: '',
      newMessage: '',
      blogs: []
    };
    // localStorage.clear();
  }

  componentDidMount() {
    const blogsStored = JSON.parse(localStorage.getItem('Blogs'));

    const blogs = blogsStored ? this.setState({ blogs: blogsStored }) : [];

    this.setState(blogs);
  }

  getMaxId() {
    const blogs = this.state.blogs;
    return blogs.length > 0 ? Math.max(...blogs.map(blog => blog.id)) : 0;
  }

  // updating every input element
  change = e => {
    this.setState({
      [ e.target.name ]: e.target.value
    });
  };

  // set the local storage and routes to the other page
  nextPath(path) {
    if (this.state.newTitle !== '' && this.state.newMessage !== '') {
      const timeStamp = Date.now();
      const _timeStamp = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
        .format(timeStamp)
        .toString();
      const id = +this.getMaxId() + 1;
      const blog = {
        id,
        title: this.state.newTitle,
        message: this.state.newMessage,
        timeStamp: _timeStamp
      };

      this.state.blogs.push(blog);
      localStorage.clear();
      localStorage.setItem('Blogs', JSON.stringify(this.state.blogs));
      this.props.history.push(path);
    } else {
      alert('Please write the title and text to save the blog');
    }
  }

  render() {
    return (
        <div>
          <form>
            <div>
              <input
              className="input-container"
              name="newTitle"
              value={ this.state.newTitle }
              placeholder="Enter the title"
              onChange={ e => this.change(e) }
            />
          </div>
            <div>
              <textarea
              name="newMessage"
              value={ this.state.newMessage }
              onChange={ e => this.change(e) }
              placeholder="Write your text here..."
              cols={ 30 }
              rows={ 30 }
            />
          </div>
            <div className="button-container">
              <button type="button" onClick={ () => this.nextPath('/blogs') }>
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Add;
