// @flow weak

import React, {
  PureComponent
}                         from 'react';
import PropTypes          from 'prop-types';
import {AppBar, Button, IconButton, Toolbar, Typography} from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';

class NavigationBar extends PureComponent {

  // eslint-disable-next-line no-undef
  static propTypes = {
      logged: PropTypes.boolean,
      loginRoute: PropTypes.string.isRequired,
      history: PropTypes.object.isRequired
  };
// eslint-disable-next-line no-undef
  static defaultProps = {
    logged : false
  }

  render(){
    const { logged, loginRoute, history } = this.props;
    return (
      <AppBar
        position="static"
        title="Internal Problem Logger"
        iconElementRight={logged ? <Button label="dashboard"/>:<Button onClick={()=>this.goLogin(loginRoute, history)} label="zone admin"/>}
      >
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="title" color="inherit">
            Internal Problem Logger
          </Typography>
          <Button color="inherit">zone admin</Button>
        </Toolbar>
      </AppBar>
    );
  }
  goLogin = (path: string, history: any) =>{
    history.push({ pathname: path});
  }
}

NavigationBar.propTypes = {
  brand:                    PropTypes.string,
  handleLeftNavItemClick:   PropTypes.func,
  handleRightNavItemClick:  PropTypes.func,
  navModel:                 PropTypes.shape({
    leftLinks:  PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link : PropTypes.string.isRequired
      })
    ).isRequired,
    rightLinks:  PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        link : PropTypes.string.isRequired
      })
    ).isRequired
  })
};

NavigationBar.defaultProps  = {
  brand  : 'brand'
};

export default NavigationBar;
