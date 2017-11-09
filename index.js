import React from 'react';
import PropTypes from 'prop-types';

export class ErrorHandler extends React.Component {
  componentWillMount() {
    this.globalErrorHandler = ErrorUtils.getGlobalHandler();
    ErrorUtils.setGlobalHandler(this.handleError.bind(this));
  }

  async handleError(error, isFatal) {
    // If the error caused the app to crash, purge the state to avoid an infinite crash loop
    if (!__DEV__ && isFatal) this.props.persistedStore.purge();

    // Make sure react-native also gets the error
    if (this.globalErrorHandler) this.globalErrorHandler(error, isFatal);
  }

  render() {
    return this.props.children;
  }
}

ErrorHandler.propTypes = {
  children: PropTypes.node.isRequired,
  persistedStore: PropTypes.object.isRequired,
};
