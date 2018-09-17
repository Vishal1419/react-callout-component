import React from 'react';
import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';
import onClickOutside from 'react-onclickoutside'

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

const Callout = props => (
  <Portal>
    <div
      id="callout"
      className={`callout ${props.className || ''}`}
      style={{
        display: props.isVisible ? 'block' : 'none',
        backgroundColor: props.color || 'rgba(0, 0, 0, 0.7)',
        [orientationMapper[props.side] === 'horizontal' ? 'top' : 'left']:
          props.parentElement
            ? orientationMapper[props.side] === 'horizontal'
              ? props.parentElement.getBoundingClientRect().top + (props.parentElement.clientHeight / 2) - (props.size.height / 2) > 0
                ? `${props.parentElement.getBoundingClientRect().top + (props.parentElement.clientHeight / 2)}px`
                : `${(props.size.height / 2) + 2}px`
              : props.parentElement.getBoundingClientRect().left + (props.parentElement.clientWidth / 2) - (props.size.width / 2) > 0
                ? `${props.parentElement.getBoundingClientRect().left + (props.parentElement.clientWidth / 2)}px`
                : `${(props.size.width / 2) + 2}px`
            : 0,
        transform: orientationMapper[props.side] === 'horizontal'
          ? `translate(${props.side === 'left' ? '-100%' : 0}, -50%)`
          : `translate(-50%, ${props.side === 'top' ? '-100%' : 0})`,
        [orientationMapper[props.side] === 'horizontal' ? 'left' : 'top']:
            props.parentElement
              ? orientationMapper[props.side] === 'horizontal'
                ? props.side === 'left'
                  ? props.parentElement.getBoundingClientRect().left - props.distanceFromParent - (props.arrowSize) > 0
                    ? `${props.parentElement.getBoundingClientRect().left - props.distanceFromParent - (props.arrowSize)}px`
                    : 0
                  : props.parentElement.getBoundingClientRect().right + props.distanceFromParent + (props.arrowSize) > 0
                    ? `${props.parentElement.getBoundingClientRect().right + props.distanceFromParent + (props.arrowSize)}px`
                    : 0
                : props.side === 'top'
                  ? props.parentElement.getBoundingClientRect().top - props.distanceFromParent - props.arrowSize > 0
                    ? `${props.parentElement.getBoundingClientRect().top - props.distanceFromParent - props.arrowSize}px`
                    : 0
                  : props.parentElement.getBoundingClientRect().bottom + props.distanceFromParent + (props.arrowSize) > 0
                    ? `${props.parentElement.getBoundingClientRect().bottom + props.distanceFromParent + (props.arrowSize)}px`
                    : 0
              : 0,
        
      }}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
      <div
        id="callout-after"
        className="callout-after"
        style={{
          borderWidth: `${props.arrowSize}px`,
          borderStyle: 'solid',
          borderColor: calculateBorderColor(props.side, props.color),
          [oppositeMapper[props.side]]: 0 - (4 * (props.arrowSize / 2)),
          [orientationMapper[props.side] === 'horizontal' ? 'top' : 'left']: 
            orientationMapper[props.side] === 'horizontal' 
              ? props.parentElement.getBoundingClientRect().top + (props.parentElement.clientHeight / 2) - (props.size.height / 2) > 0
                ? '50%'
                : props.parentElement.getBoundingClientRect().top + (props.parentElement.clientHeight / 2)
              : props.parentElement.getBoundingClientRect().left + (props.parentElement.clientWidth / 2) - (props.size.width / 2) > 0
                ? '50%'
                : props.parentElement.getBoundingClientRect().left + (props.parentElement.clientWidth / 2),
          [orientationMapper[props.side] === 'horizontal' ? 'marginTop' : 'marginLeft']: - props.arrowSize,
        }}
      />
    </div>
  </Portal>
);

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

export default sizeMe()(onClickOutside(Callout));
// one more prop exposed: handleClickOutside due to onClickOutside