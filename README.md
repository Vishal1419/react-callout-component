# This package is deprecated. Please do not use it.

## How does callout look?

![callout image](docImages/Screen%20Shot%202018-08-09%20at%201.11.43%20AM.png)

## Installation

> `npm i react-callout-component`

## Basic Usage

You need to make a change to two files:

> index.html

```html
<div id="portal"></div> <!-- add this line after div with id root -->
```

> any of your component where you want to show callout

```jsx
import React, { Component } from 'react';
import Callout from 'react-callout-component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      box: null,
    };
    this.boxEl = React.createRef();
  }

  componentDidMount() {
    this.setState({
      box: this.boxEl.current,
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 500 }}>
        <div ref={this.boxEl} style={{ backgroundColor: 'purple', height: 100, width: 100 }} />
        <Callout isVisible parentElement={this.state.box}>
          <span style={{ color: 'white' }}>This is a box</span>
        </Callout>
      </div>
    );
  }
}

export default App;

```

## Show callout only when parent element is hovered

```jsx
import React, { Component } from 'react';
import Callout from 'react-callout-component';

class App extends Component {
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

export default App;

```

## Show callout when parent element or callout itself is hovered

```jsx
import React, { Component } from 'react';
import Callout from 'react-callout-component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      box: null,
      isBoxHovered: false,
    };
    this.boxEl = React.createRef();
    this.onBoxMouseEnter = this.onBoxMouseEnter.bind(this);
    this.onBoxMouseLeave = this.onBoxMouseLeave.bind(this);
  },

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
          onMouseEnter={this.onBoxMouseEnter}
          onMouseLeave={this.onBoxMouseLeave}
        >
          <span style={{ color: 'white' }}>This is a box</span>
        </Callout>
      </div>
    );
  }
}

export default App;

```

## Show callout only when parent element is clicked and hide it on click outside

```jsx
import React, { Component } from 'react';
import Callout from 'react-callout-component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      box: null,
      isBoxHovered: false,
    };
    this.boxEl = React.createRef();
    this.onBoxClick = this.onBoxClick.bind(this);
    this.onBoxClickOutside = this.onBoxClickOutside.bind(this);
  }

  componentDidMount() {
    this.setState({
      box: this.boxEl.current,
    });
  }

  onBoxClick() {
    this.setState({
      isBoxHovered: true,
    });
  }

  onBoxClickOutside() {
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
          role="presentation"
          onClick={this.onBoxClick}
          onKeyDown={() => {}}
        />
        <Callout
          isVisible={this.state.isBoxHovered}
          parentElement={this.state.box}
          onClickOutside={this.onBoxClickOutside}
        >
          <span style={{ color: 'white' }}>This is a box</span>
        </Callout>
      </div>
    );
  }
}

export default App;

```

## callout props

| prop              | Possible values                 | default value       | required?|
|-------------------|:-------------------------------:|:-------------------:|:--------:|
|isVisible          |`true`, `false`                  |`false`              |yes       |
|parentElement      |ref to React element             |-                    |yes       |
|className          |string                           |-                    |no        |
|color              |any valid css color              |rgba(0, 0, 0, 0.7)   |no        |
|side               |`top`, `bottom`, `right`, `left` |`left`               |no        |
|distanceFromParent |number from -∞ to +∞ including 0 |0                    |no        |
|arrowSize          |number from 0 to +∞              |10                   |no        |
|onMouseEnter       |function                         |() => {}             |no        |
|onMouseLeave       |function                         |() => {}             |no        |
|onClickOutside     |function                         |() => {}             |no        |
