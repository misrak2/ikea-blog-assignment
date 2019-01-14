import React from 'react';
import ReactDOM from 'react-dom';
import Blog from './Blog';

let component;
describe('Blog component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const array = [];
    component = ReactDOM.render(<Blog history={array} />, div);

    localStorage.setItem("Post", JSON.stringify({ title: 'Title', message: 'Message' }));
    // ReactDOM.unmountComponentAtNode(div);
  });
});

describe('nextPath', () => {
  it('should route to other page if edit button clicked', () => {
    const e = {
      target: {
        value: 'edit',
      }
    }
    component.nextPath('home', e);
  });

  it('should clear the local storage and route to other page if remove button clicked', () => {
    const e = {
      target: {
        value: 'remove',
      }
    }
    component.nextPath('home', e);
  });

})

describe('componentDidMount', () => {
  it('shold update the state', () => {
    localStorage.setItem("Post", JSON.stringify({ title: 'Title', message: 'Message' }));
    const timeStamp = Date.now();
    const _timeStamp =
      new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timeStamp).toString();
    localStorage.setItem("Time", JSON.stringify(_timeStamp));

    component.componentDidMount();
    const expected = {
      title: 'Title',
      message: 'Message',
      lastUpdated: _timeStamp
    }
    
    const actual = JSON.parse(localStorage.getItem('Post'));
    actual.lastUpdated = JSON.parse(localStorage.getItem('Time'));
    expect(actual).toEqual(expected);

  });

})

