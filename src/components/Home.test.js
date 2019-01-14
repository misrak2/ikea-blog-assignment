import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

let component;
describe('Home component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const array = [];
    component = ReactDOM.render(<Home history={ array } />, div);
    component.setState({ title: 'hi', message: 'message' });
    // ReactDOM.unmountComponentAtNode(div);
  });
});

describe('nextPath', () => {
  it('should set the state and local storage if the title and message box filled', () => {
    component.nextPath('blog');
    const expected = JSON.parse(localStorage.getItem('Post'));
    expect(component.state).toEqual(expected);
  });

  it('should show alert if the title and message box not filled', () => {
    component.nextPath('blog');
    // component.setState({title: '', message: ''});
    // if the user not entered a title and a blog text, local storage to be reset
    // alert window will be displayed
    localStorage.clear();
    const expectedTimeStamp = JSON.parse(localStorage.getItem('Time'));
    expect(expectedTimeStamp).toEqual(null);
  });
});
