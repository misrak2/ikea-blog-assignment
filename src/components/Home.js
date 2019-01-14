import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      message: '',
    }
  }

  componentDidMount() {
    const post = JSON.parse(localStorage.getItem('Post'));
    this.setState(post);
  } 

  // set the local storage and routes to the other page
  nextPath(path) {
    if(this.state.title !== '' && this.state.message !== '') {
      const timeStamp = Date.now();
      const _timeStamp = 
        new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timeStamp).toString();
      localStorage.setItem("Post", JSON.stringify(this.state));
      localStorage.setItem("Time", JSON.stringify(_timeStamp));
      this.props.history.push(path);
    } else {
      alert('Please write the title and text to save the blog');
    }
  }

  // updating every input element
  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    return (
      <div>
        <form>
          <div>
            <input
              className="input-container"
              name='title'
              value={this.state.title}
              placeholder="Enter the title"
              onChange={e => this.change(e)}
            />
          </div>
          <div>
            <textarea
              name='message'
              value={this.state.message}
              onChange={e => this.change(e)}
              placeholder="Write your text here..." cols={30} rows={30} />
          </div>
          <button type="button" onClick={() => this.nextPath('/blog')}>Save</button>
        </form>
      </div>
    )

  }

}
export default Home;
