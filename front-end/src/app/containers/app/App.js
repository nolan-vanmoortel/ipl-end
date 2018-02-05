// @flow weak

import React, {
  Component
}                             from 'react';
import PropTypes              from 'prop-types';
import {
  NavigationBar,
  Footer
}                             from '../../components';
import navigationModel        from '../../config/navigation.json';
import MainRoutes             from '../../routes/MainRoutes';
import {Affix, BackTop, Button, Layout} from "antd";
const { Content } = Layout;
import styles                 from './app.scss';


class App extends Component {
  static propTypes = {
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    currentView: PropTypes.string

  };

  state = {
    collapsed: true
  };

  onCollapse = () => {
    const { collapsed } = this.state;
    const collapsedNew = !collapsed;

    this.setState({ collapsed:collapsedNew });
  }

  goToReader = () =>{
    const { history } = this.props;
    history.push("/");
  }

  render() {
    const { collapsed } = this.state;

    return (
      <div id="appContainer">
        <Layout style={{ minHeight: '100vh' }}>
          <NavigationBar collapsedNav={collapsed} handleReturn={this.goToReader}/>
          <Layout>
            <Content className={styles.backgroundApp}>
              <MainRoutes />
            </Content>
            <Footer/>
            <Affix offsetBottom={0} onChange={affixed => console.log(affixed)}>
              <Button className={styles.darkButton} onClick={this.onCollapse} >{collapsed?"Afficher Menu":"Cacher Menu"}</Button>
            </Affix>
          </Layout>
          <BackTop />
        </Layout>
      </div>
    );
  }
}

export default App;
