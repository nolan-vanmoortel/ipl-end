// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import {Jumbotron}    from '../../components';
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
        <Jumbotron>
          <h1>
            Vous êtes perdu a tout jamais :(
          </h1>
        </Jumbotron>
      </AnimatedView>
    );
  }
}

export default PageNotFound;
