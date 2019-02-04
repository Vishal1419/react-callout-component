import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import SizeMe from 'react-sizeme';

import './main.css';
import Portal from './Portal';
import Arrow from './Arrow';
import { orientationMapper, oppositeOrientationMapper } from './utils/orientation';
import { noop, getScrollParent, getBoundingClientRect } from './utils';

const calculateCalloutCrossAxisPosition = (callout, side, parentElement, scrollingElement) => {
  const calculateCalloutPosition = (grandParentLength, scrollLength, parentPositionLowerLimit, parentLength, calloutLength) => {
    const isCroppedFromLowerLimit = parentPositionLowerLimit + scrollLength + (parentLength / 2) - (calloutLength / 2) < scrollLength;
    const isCroppedFromUpperLimit = parentPositionLowerLimit + scrollLength + (parentLength / 2) + (calloutLength / 2) > grandParentLength + scrollLength;
    if (isCroppedFromLowerLimit) {
      return scrollLength + 2;
    } else if (isCroppedFromUpperLimit) {
      return grandParentLength - calloutLength + scrollLength - 2;
    } else {
      return parentPositionLowerLimit + scrollLength + (parentLength / 2) - (calloutLength / 2);
    }
  }

  const orientation = orientationMapper[side];
  const { innerHeight: windowHeight, innerWidth: windowWidth } = window;
  const { top: parentTop = 0, left: parentLeft = 0 } = getBoundingClientRect(parentElement) || {};
  const { clientWidth: parentWidth = 0, clientHeight: parentHeight = 0 } = parentElement || {};
  const { scrollX = 0, scrollY = 0 } = scrollingElement || {};
  // const { offsetWidth: calloutWidth = 0, offsetHeight: calloutHeight = 0 } = callout || {};
  console.log(callout, 'callout');
  const abc = getBoundingClientRect(callout) || {};

  console.log(abc);
  const { width: calloutWidth = 0, height: calloutHeight = 0 } = abc;

  if (parentElement) {
    if (orientation === 'horizontal') {
      return calculateCalloutPosition(windowHeight, scrollY, parentTop, parentHeight, calloutHeight);
    } else {
      return calculateCalloutPosition(windowWidth, scrollX, parentLeft, parentWidth, calloutWidth);
    }
  } else {
    return 0;
  }
};

const calculateCalloutMainAxisPosition = (callout, side, parentElement, distanceFromParent, arrowSize) => {
  const { top: parentTop = 0, left: parentLeft = 0, right: parentRight = 0, bottom: parentBottom = 0 } = getBoundingClientRect(parentElement) || {};
  // const { offsetWidth: calloutWidth = 0, offsetHeight: calloutHeight = 0 } = callout || {};
  const { width: calloutWidth = 0, height: calloutHeight = 0 } = getBoundingClientRect(callout) || {};

  switch (side) {
    case 'left':
    case 'top': {
      const parentLength = side === 'left' ? parentLeft : parentTop;
      const calloutLength = side === 'left' ? calloutWidth : calloutHeight;
      return parentLength - distanceFromParent - arrowSize > 0 ? parentLength - distanceFromParent - arrowSize - calloutLength : 0
    }
    case 'right':
    case 'bottom': {
      const parentLength = side === 'right' ? parentRight : parentBottom;
      return parentLength + distanceFromParent + arrowSize > 0 ? parentLength + distanceFromParent + arrowSize : 0
    }
    default:
      return 0;
  }
}

class Callout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollingElement: null,
      shouldRerender: false,
    };
    this.node = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidUpdate() {
    const { height: calloutHeight = 0 } = getBoundingClientRect(this.node.current);
    console.log(calloutHeight, 'did component update');
    if (calloutHeight > 0 && this.state.shouldRerender) {
      this.setState({ shouldRerender: false });
    } else if (calloutHeight === 0 && !this.state.shouldRerender) {
      this.setState({ shouldRerender: true });
    }
  }

  componentDidMount() {
    const { side, parentElement } = this.props;
    const orientation = orientationMapper[side];
    const oppositeOrientation = oppositeOrientationMapper[orientation];
    this.setState({
      scrollingElement: getScrollParent(parentElement, oppositeOrientation) || window,
    }, () => {
      const { scrollingElement } = this.state;
      scrollingElement.addEventListener('scroll', this.handleScroll, true);
    });
    document.addEventListener('mousedown', this.handleClick, false);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    const { scrollingElement } = this.state;
    document.removeEventListener('mousedown', this.handleClick, false);
    scrollingElement.removeEventListener('scroll', this.handleScroll, false);
    window.removeEventListener('resize', this.handleResize);
  }

  handleClick(event) {
    if (this.node && this.node.current) {
      if (this.node.current.contains(event.target)) {
        return;
      }
      const { onClickOutside } = this.props;
      if (onClickOutside) onClickOutside();
    }
  }

  handleScroll() {
    this.forceUpdate();
  }

  handleResize() {
    this.forceUpdate();
  }

  render() {
    const { parentElement, side, distanceFromParent, arrowSize, color, className, isVisible, onMouseEnter, onMouseLeave, children } = this.props;
    const { scrollingElement } = this.state;
    const orientation = orientationMapper[side];
    // const currentNode = this.node && this.node.current;
    // console.log(currentNode, 'currentNode');
    return (
      isVisible
        ? (
          <Portal>
            <div
              id="callout"
              ref={this.node}
              className={`callout ${className || ''}`}
              style={{
                display: isVisible ? 'block' : 'none',
                backgroundColor: color || 'rgba(0, 0, 0, 0.7)',
                [orientation === 'horizontal' ? 'left' : 'top']: calculateCalloutMainAxisPosition(this.node && this.node.current, side, parentElement, distanceFromParent, arrowSize),
                [orientation === 'horizontal' ? 'top' : 'left']: calculateCalloutCrossAxisPosition(this.node && this.node.current, side, parentElement, scrollingElement),
              }}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              {children}
              <Arrow
                callout={this.node && this.node.current}
                side={side}
                color={color}
                arrowSize={arrowSize}
                parentElement={parentElement}
                scrollingElement={scrollingElement}
              />
            </div>
          </Portal>
        )
        : null
    );
  }
}

Callout.propTypes = {
  parentElement: PropTypes.objectOf(PropTypes.any).isRequired,
  side: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  distanceFromParent: PropTypes.number,
  arrowSize: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  isVisible: PropTypes.bool,
  onClickOutside: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
}

Callout.defaultProps = {
  side: 'left',
  distanceFromParent: 0,
  arrowSize: 10,
  color: '',
  className: '',
  isVisible: false,
  onClickOutside: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  children: <div />,
}

export default Callout;
