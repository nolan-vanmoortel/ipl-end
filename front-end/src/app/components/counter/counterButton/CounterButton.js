// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import {Button} from 'antd';

class CounterButton extends PureComponent {
// eslint-disable-next-line no-undef
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    onClick:  PropTypes.func
  };

  render() {
    const { name, color} = this.props;
    return (
      <Button bsStyle={color} onClick={this.handleClick}>{name}</Button>
    );
  }

// eslint-disable-next-line no-undef
  handleClick = () => {
    const { onClick } = this.props;
    onClick();
  }
}

export default CounterButton;
