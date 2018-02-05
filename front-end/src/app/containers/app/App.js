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
import {Layout} from "antd";
const { Content } = Layout;
import Footer from "../../components/footer/Footer";
import styles                 from './app.scss';


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
        <Layout style={{ minHeight: '100vh' }}>
          <NavigationBar/>
          <Layout>
            <Content className={styles.backgroundApp}>
              <MainRoutes />
            </Content>
            <Footer/>
          </Layout>
          <BackToTop
            minScrollY={40}
            scrollTo={'appContainer'}
          />
        </Layout>
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
