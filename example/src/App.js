import React, { Component } from 'react'
import Callout from 'react-callout-component';
// import 'react-callout-component/dist/main.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      box: null,
      isBoxHovered: false,
    };
    this.boxEl = React.createRef();
    this.onBoxMouseEnter = this.onBoxMouseEnter.bind(this);
    this.onBoxMouseLeave = this.onBoxMouseLeave.bind(this);
  }

  componentDidMount() {
    this.setState({
      box: this.boxEl.current,
    });
  }

  onBoxMouseEnter() {
    this.setState({
      isBoxHovered: true,
    });
  }

  onBoxMouseLeave() {
    this.setState({
      isBoxHovered: false,
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 500 }}>
        <div
          ref={this.boxEl}
          style={{ backgroundColor: 'purple', height: 100, width: 100 }}
          onMouseEnter={this.onBoxMouseEnter}
          onMouseLeave={this.onBoxMouseLeave}
        />
        <Callout
          isVisible={this.state.isBoxHovered}
          parentElement={this.state.box}
        >
          <span style={{ color: 'white' }}>This is a box</span>
        </Callout>
      </div>
    );
  }
}
