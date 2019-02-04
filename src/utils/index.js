export const noop = () => {};

export const getScrollParent = (node) => {
  if (!node) return null;

  const { style, scrollWidth, scrollHeight, clientWidth, clientHeight } = node;

  if (((style && (style.overflowX === 'auto' || style.overflowX === 'scroll')) && scrollWidth > clientWidth) ||
  ((style && (style.overflowY === 'auto' || style.overflowY === 'scroll')) && scrollHeight > clientHeight)) {
    return node;
  }

  return getScrollParent(node.parentNode);
};

export const getBoundingClientRect = (element) => {
  return (element && element.getBoundingClientRect()) || {};
};
