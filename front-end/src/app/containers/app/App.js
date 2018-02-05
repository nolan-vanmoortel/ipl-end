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
import {MuiThemeProvider} from "material-ui/styles/index";


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
    const { navModel } = this.state;

    return (
      <div id="appContainer">
        <MuiThemeProvider>
          <NavigationBar
            brand={navModel.brand}
            navModel={navModel}
            handleLeftNavItemClick={this.handleLeftNavItemClick}
            handleRightNavItemClick={this.handleRightNavItemClick}
          />
          <div className="container-fluid">
            <MainRoutes />
          </div>
          <BackToTop
            minScrollY={40}
            scrollTo={'appContainer'}
          />
        </MuiThemeProvider>
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
