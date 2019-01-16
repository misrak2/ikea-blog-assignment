import React from 'react';
import ReactDOM from 'react-dom';
import Add from './Add';

let component;
describe('Home component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const array = [];
    component = ReactDOM.render(<Add history={ array } />, div);
    component.setState({ title: 'hi', message: 'message' });
    window.alert = msg => {
      console.log(msg);
    };
    // ReactDOM.unmountComponentAtNode(div);
  });
});

describe('nextPath', () => {
  it('should set the state and local storage if the title and message box filled', () => {
    component.nextPath('blog');
    const expected = {
      blogs: [],
      message: 'message',
      newMessage: '',
      newTitle: '',
      title: 'hi'
    };
    expect(component.state).toEqual(expected);
  });

  it('should show alert if the title and message box not filled', () => {
    component.nextPath('blog');
    // component.setState({title: '', message: ''});
    // if the user not entered a title and a blog text, local storage to be reset
    // alert window will be displayed
    localStorage.clear();
    const newTitle = component.state.newTitle;
    expect(newTitle).toEqual('');
  });
});
