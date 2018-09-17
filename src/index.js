import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';

import './main.css';
import Portal from './Portal';

const sides = ['top', 'right', 'bottom', 'left'];

const orientationMapper = {
  top: 'vertical',
  right: 'horizontal',
  bottom: 'vertical',
  left: 'horizontal',
}

const oppositeMapper = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}

const calculateBorderColor = (position, color) => {
  const borderColors = sides.map(side =>
    side === position ? color || 'rgba(0, 0, 0, 0.7)' : 'transparent');
  return borderColors.join(' ');
}

class Callout extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }
  
  handleClick(event) {
    if (this.node.contains(event.target)) {
      console.log('called');
      return;
    }
    if (this.props.onClickOutside) this.props.onClickOutside();
  }

  render() {
    return (
      <Portal>
        <div
          id="callout"
          ref={node => this.node = node}
          className={`callout ${this.props.className || ''}`}
          style={{
            display: this.props.isVisible ? 'block' : 'none',
            backgroundColor: this.props.color || 'rgba(0, 0, 0, 0.7)',
            [orientationMapper[this.props.side] === 'horizontal' ? 'top' : 'left']:
              this.props.parentElement
                ? orientationMapper[this.props.side] === 'horizontal'
                  ? this.props.parentElement.getBoundingClientRect().top + (this.props.parentElement.clientHeight / 2) - (this.props.size.height / 2) > 0
                    ? `${this.props.parentElement.getBoundingClientRect().top + (this.props.parentElement.clientHeight / 2)}px`
                    : `${(this.props.size.height / 2) + 2}px`
                  : this.props.parentElement.getBoundingClientRect().left + (this.props.parentElement.clientWidth / 2) - (this.props.size.width / 2) > 0
                    ? `${this.props.parentElement.getBoundingClientRect().left + (this.props.parentElement.clientWidth / 2)}px`
                    : `${(this.props.size.width / 2) + 2}px`
                : 0,
            transform: orientationMapper[this.props.side] === 'horizontal'
              ? `translate(${this.props.side === 'left' ? '-100%' : 0}, -50%)`
              : `translate(-50%, ${this.props.side === 'top' ? '-100%' : 0})`,
            [orientationMapper[this.props.side] === 'horizontal' ? 'left' : 'top']:
                this.props.parentElement
                  ? orientationMapper[this.props.side] === 'horizontal'
                    ? this.props.side === 'left'
                      ? this.props.parentElement.getBoundingClientRect().left - this.props.distanceFromParent - (this.props.arrowSize) > 0
                        ? `${this.props.parentElement.getBoundingClientRect().left - this.props.distanceFromParent - (this.props.arrowSize)}px`
                        : 0
                      : this.props.parentElement.getBoundingClientRect().right + this.props.distanceFromParent + (this.props.arrowSize) > 0
                        ? `${this.props.parentElement.getBoundingClientRect().right + this.props.distanceFromParent + (this.props.arrowSize)}px`
                        : 0
                    : this.props.side === 'top'
                      ? this.props.parentElement.getBoundingClientRect().top - this.props.distanceFromParent - this.props.arrowSize > 0
                        ? `${this.props.parentElement.getBoundingClientRect().top - this.props.distanceFromParent - this.props.arrowSize}px`
                        : 0
                      : this.props.parentElement.getBoundingClientRect().bottom + this.props.distanceFromParent + (this.props.arrowSize) > 0
                        ? `${this.props.parentElement.getBoundingClientRect().bottom + this.props.distanceFromParent + (this.props.arrowSize)}px`
                        : 0
                  : 0,
            
          }}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
        >
          {this.props.children}
          <div
            id="callout-after"
            className="callout-after"
            style={{
              borderWidth: `${this.props.arrowSize}px`,
              borderStyle: 'solid',
              borderColor: calculateBorderColor(this.props.side, this.props.color),
              [oppositeMapper[this.props.side]]: 0 - (4 * (this.props.arrowSize / 2)),
              [orientationMapper[this.props.side] === 'horizontal' ? 'top' : 'left']: 
                orientationMapper[this.props.side] === 'horizontal' 
                  ? this.props.parentElement.getBoundingClientRect().top + (this.props.parentElement.clientHeight / 2) - (this.props.size.height / 2) > 0
                    ? '50%'
                    : this.props.parentElement.getBoundingClientRect().top + (this.props.parentElement.clientHeight / 2)
                  : this.props.parentElement.getBoundingClientRect().left + (this.props.parentElement.clientWidth / 2) - (this.props.size.width / 2) > 0
                    ? '50%'
                    : this.props.parentElement.getBoundingClientRect().left + (this.props.parentElement.clientWidth / 2),
              [orientationMapper[this.props.side] === 'horizontal' ? 'marginTop' : 'marginLeft']: - this.props.arrowSize,
            }}
          />
        </div>
      </Portal>
    );
  }
}

Callout.propTypes = {
  side: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  arrowSize: PropTypes.number,
  parentElement: PropTypes.objectOf(PropTypes.any).isRequired,
  distanceFromParent: PropTypes.number,
  className: PropTypes.string,
  isVisible: PropTypes.bool,
}

Callout.defaultProps = {
  side: 'left',
  arrowSize: 10,
  distanceFromParent: 0,
  className: '',
  isVisible: false,
}

export default sizeMe()(Callout);