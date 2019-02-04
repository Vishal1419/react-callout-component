import React, { Component } from 'react'
import Callout from 'react-callout-component';
// import 'react-callout-component/dist/main.css';

export default class App extends Component {
  constructor() {
    super();
    const state = {};
    for (let i = 0; i < 15; i++) {
      // state[`box${i + 1}`] = null;
      state[`box${i + 1}BackgroundColor`] = '#333333';
      state[`isBox${i + 1}Visible`] = false;
    }

    this.state = state;
    for (let i = 0; i < 15; i++) {
      this[`boxEl${i + 1}`] = React.createRef();
      this.onBoxClick = this.onBoxClick.bind(this);
      this.onBoxClickOutside = this.onBoxClickOutside.bind(this);
    }
  }

  componentDidMount() {
    const refs = {};
    for (let i = 0; i < 15; i++) {
      // refs[`box${i + 1}`] = this[`boxEl${i + 1}`].current;
      refs[`box${i + 1}BackgroundColor`] = this.getRandomColor();
    }
    this.setState(refs);
  }

  onBoxClick(boxNumber) {
    this.setState({
      [`isBox${boxNumber}Visible`]: true,
    });
  }
  
  onBoxClickOutside(boxNumber) {
    if (this.state[`isBox${boxNumber}Visible`]) {
      this.setState({
        [`isBox${boxNumber}Visible`]: false,
      });
    }
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    return (
      <div id="main-div" style={{ display: 'flex', margin: 10, marginTop: 300, overflowX: 'auto' }}>
        {
          Array(15).fill().map((_, index) => (
            <div key={index} style={{ margin: 10 }}>
              <div
                ref={this[`boxEl${index + 1}`]}
                style={{ backgroundColor: this.state[`box${index + 1}BackgroundColor`], height: 100, width: 100 }}
                onClick={() => this.onBoxClick(index + 1)}
              />
              <Callout
                isVisible={this.state[`isBox${index + 1}Visible`]}
                parentElement={this[`boxEl${index + 1}`] && this[`boxEl${index + 1}`].current}
                side="bottom"
                trigger="click"
                distanceFromParent={-10}
                onClickOutside={() => this.onBoxClickOutside(index + 1)}
                arrowSize={18}
              >
                <div style={{ color: 'white', width: 300, height: 150 }}>This is a box</div>
              </Callout>
            </div>
          ))
        }
      </div>
    );
  }
}
