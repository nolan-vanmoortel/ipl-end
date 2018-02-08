// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import AnimatedView   from '../../components/animatedView/AnimatedView';

class PageNotFound extends PureComponent {
  static propTypes= {
    // react-router 4:
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    // views:
    currentView:  PropTypes.string.isRequired,
    enterPageNotFound:   PropTypes.func.isRequired,
    leavePageNotFound:   PropTypes.func.isRequired
  };

  componentDidMount() {
    const { enterPageNotFound } = this.props;
    enterPageNotFound();
  }

  componentWillUnmount() {
    const { leavePageNotFound } = this.props;
    leavePageNotFound();
  }

  render() {
    return(
      <AnimatedView>
        <h1>Vous êtes dans le VOID de notre site.</h1>
      </AnimatedView>
    );
  }
}

export default PageNotFound;
