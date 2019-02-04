import React from 'react';
import PropTypes from 'prop-types';

import { sides, oppositeSideMapper } from './utils/sides';
import { orientationMapper } from './utils/orientation';
import { getBoundingClientRect } from './utils';

const calculateArrowColor = (position, color) => {
  const borderColors = sides.map(side =>
    side === position ? color || 'rgba(0, 0, 0, 0.7)' : 'transparent');
  return borderColors.join(' ');
}

const calculateArrowCrossAxisPosition = (callout, side, parentElement, scrollingElement) => {
  const calculateArrowPosition = (grandParentLength, scrollLength, parentPositionLowerLimit, parentLength, calloutLength) => {
    const isCroppedFromLowerLimit = parentPositionLowerLimit + scrollLength + (parentLength / 2) - (calloutLength / 2) < scrollLength;
    const isCroppedFromUpperLimit = parentPositionLowerLimit + scrollLength + (parentLength / 2) + (calloutLength / 2) > grandParentLength + scrollLength;
    if (isCroppedFromLowerLimit) {
      return parentPositionLowerLimit + (parentLength / 2);
    } else if (isCroppedFromUpperLimit) {
      return parentPositionLowerLimit + (parentLength / 2) - (grandParentLength - calloutLength);
    } else {
      return '50%';
    }
  }

  const orientation = orientationMapper[side];
  const { innerHeight: windowHeight, innerWidth: windowWidth } = window;
  const { top: parentTop = 0, left: parentLeft = 0 } = getBoundingClientRect(parentElement) || {};
  const { clientWidth: parentWidth = 0, clientHeight: parentHeight = 0 } = parentElement || {};
  const { scrollX = 0, scrollY = 0 } = scrollingElement || {};
  const { offsetWidth: calloutWidth = 0, offsetHeight: calloutHeight = 0 } = callout || {};

  if (parentElement) {
    if (orientation === 'horizontal') {
      return calculateArrowPosition(windowHeight, scrollY, parentTop, parentHeight, calloutHeight);
    } else {
      return calculateArrowPosition(windowWidth, scrollX, parentLeft, parentWidth, calloutWidth);
    }
  } else {
    return 0;
  }
}

const Arrow = ({ callout, side, color, arrowSize, parentElement, scrollingElement }) => {
  const orientation = orientationMapper[side];
  const oppositeSide = oppositeSideMapper[side];
  return (
    <div
      id='callout-arrow'
      className='callout-arrow'
      style={{
        borderWidth: `${arrowSize}px`,
        borderStyle: 'solid',
        borderColor: calculateArrowColor(side, color),
        [oppositeSide]: 0 - (4 * (arrowSize / 2)), // this is to display arrow outside the callout component
        [orientation === 'horizontal' ? 'top' : 'left']: calculateArrowCrossAxisPosition(callout, side, parentElement, scrollingElement),
        [orientation === 'horizontal' ? 'marginTop' : 'marginLeft']: -arrowSize,
      }}
    />
  );
}

Arrow.propTypes = {
  callout: PropTypes.node,
  side: PropTypes.oneOf(sides),
  color: PropTypes.string,
  arrowSize: PropTypes.number,
  parentElement: PropTypes.objectOf(PropTypes.any),
  scrollingElement: PropTypes.node,
};

Arrow.defaultProps = {
  callout: null,
  side: 'left',
  color: '',
  arrowSize: 10,
  parentElement: {},
  scrollingElement: window,
};

export default Arrow;
