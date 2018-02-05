// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import {Button}       from 'react-bootstrap';

class scanQrButton extends PureComponent {
// eslint-disable-next-line no-undef
  static propTypes = {
    onClick:  PropTypes.func
  };

  render() {
    return (
      <Button onClick={this.handleClick}>Scan</Button>
    );
  }

// eslint-disable-next-line no-undef
  handleClick = () => {
    const { onClick } = this.props;
    onClick();
  }
}

export default scanQrButton;
