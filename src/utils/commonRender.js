const renderCallback = ({ render, children }, wizard) => {
  if (render) {
    return render(wizard);
  } else if (typeof children === 'function') {
    return children(wizard);
  }
  return children;
};

export default renderCallback;
