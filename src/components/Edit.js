import React, { Component } from 'react';
import './Edit.css';

class Edit extends Component {
  constructor(prop) {
    super(prop);

    this.state = {
      blogs: [],
      id: '',
      title: '',
      message: '',
      timeStamp: ''
    };
  }

  componentDidMount() {
    const selectedBlogStored = JSON.parse(localStorage.getItem('SelectedBlog'));

    const blogsStore = JSON.parse(localStorage.getItem('Blogs')) || []; // copy the localstorage
    const selectedBlog = selectedBlogStored || {}; // selected blog from the blog list

    this.setState({ blogs: blogsStore });
    this.setState(selectedBlog);
  }

  // updating every input element
  change = e => {
    this.setState({
      [ e.target.name ]: e.target.value
    });
  };

  // set the local storage and routes to the other page
  nextPath(path, id) {
    if (this.state.title !== '' && this.state.message !== '') {
      const _timeStamp = Date.now();
      const timeStamp = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
        .format(_timeStamp)
        .toString();
      this.setState({ timeStamp });

      const blogs = this.updateBlogs(timeStamp, id);
      this.setState(blogs);

      localStorage.clear();
      localStorage.setItem('Blogs', JSON.stringify(blogs));
      this.props.history.push(path);
    } else {
      alert('Please write the title and text to save the blog');
    }
  }

  updateBlogs(_timeStamp, id) {
    const blogsStore = JSON.parse(localStorage.getItem('Blogs'));
    return blogsStore.map(blog => {
      if (blog.id === id) {
        blog.title = this.state.title;
        blog.message = this.state.message;
        blog.timeStamp = _timeStamp;
        return blog;
      }
      return blog;
    });
  }

  render() {
    console.log(this.state.blogs.length > 0 ? this.state.blogs[ 0 ].id : 0);
    return (
        <div>
          <form>
            <div>
              <input
              className="input-container"
              name="title"
              value={ this.state.title }
              placeholder="Enter the title"
              onChange={ e => this.change(e) }
            />
          </div>
            <div>
              <textarea
              name="message"
              value={ this.state.message }
              onChange={ e => this.change(e) }
              placeholder="Write your text here..."
              cols={ 30 }
              rows={ 30 }
            />
          </div>
            <div className="button-container">
              <button
              className="save-button"
              type="button"
              onClick={ () => this.nextPath('/blogs', this.state.id) }
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Edit;
