import React, { Component } from 'react';
import './Blogs.css';

class Blogs extends Component {
  constructor(prop) {
    super(prop);

    this.state = {
      blogs: [],
      selectedBlog: {
        id: '',
        title: '',
        message: '',
        timeStamp: ''
      }
    };
  }

  componentDidMount() {
    const blogsStored = JSON.parse(localStorage.getItem('Blogs'));
    const blogs = blogsStored ? this.setState({ blogs: blogsStored }) : [];
    this.setState(blogs);
  }

  remove = (array, selected) => array.filter(el => el.id !== selected.id);

  nextPath(path?, e, selectedBlog) {
    const type = e.target && e.target.value;
    switch (type) {
      case 'edit':
        this.setState({ selectedBlog });
        localStorage.setItem('SelectedBlog', JSON.stringify(selectedBlog));
        this.props.history.push(path);
        break;
      case 'remove':
        const updatedBlogs = this.remove(this.state.blogs, selectedBlog);

        this.setState({ blogs: updatedBlogs });
        localStorage.clear();
        localStorage.setItem('Blogs', JSON.stringify(updatedBlogs));
        break;
      case 'add-blog':
        this.props.history.push(path);
        break;
      default:
        break;
    }
    // if (e.target && e.target.value === 'edit') {
    // localStorage.clear();
    // }
  }

  render() {
    return (
        <div>
          <div className="add-blog-container">
            <button
            className="add-blog"
            value="add-blog"
            onClick={ e => this.nextPath('/add-blog', e) }
          >
            Add new blog
          </button>
        </div>
          {this.state.blogs.map(item => (
            <div key={ item.id } className="blog">
              <h1>{item.title}</h1>
              <span>Last updated: {item.timeStamp}</span>
              <span>{item.message}</span>
              <div className="button-container">
                <button
                className="setting-button"
                value="edit"
                onClick={ e => this.nextPath(`/edit-blog/${ item.id }`, e, item) }
              >
                Edit
              </button>
                <button
                className="setting-button"
                value="remove"
                onClick={ e => this.nextPath('', e, item) }
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Blogs;
