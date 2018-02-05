// @flow weak

import React, {
  Component
}                             from 'react';
import PropTypes              from 'prop-types';
import {
  NavigationBar,
  BackToTop
}                             from '../../components';
import navigationModel        from '../../config/navigation.json';
import MainRoutes             from '../../routes/MainRoutes';
import Reboot                 from 'material-ui/Reboot';

class App extends Component {
  static propTypes = {
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    currentView: PropTypes.string

  };

  state = {
    navModel : navigationModel
  };

  render() {
    const { history } = this.props;

    return (
      <div id="appContainer">
        <Reboot/>
        <NavigationBar
          logged={false}
          loginRoute="/login"
          history={history}
        />
        <div className="container-fluid">
          <MainRoutes />
        </div>
        <BackToTop
          minScrollY={40}
          scrollTo={'appContainer'}
        />
      </div>
    );
  }

  handleLeftNavItemClick = (event, viewName) => {
    // ?
  }

  handleRightNavItemClick = (event, viewName) => {
    // ?
  }
}

export default App;
