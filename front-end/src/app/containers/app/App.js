// @flow weak

import React, {
  Component
}                             from 'react';
import PropTypes              from 'prop-types';
import {
  NavigationBar,
  Footer
}                             from '../../components';
import MainRoutes             from '../../routes/MainRoutes';
import {Affix, BackTop, Button, Layout} from 'antd';
import styles                 from './app.scss';
const { Content } = Layout;

class App extends Component {
  static propTypes = {
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    currentView: PropTypes.string,
    machines: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    getMachines: PropTypes.func.isRequired,
    updateMachines: PropTypes.func.isRequired,

    disconnectUser: PropTypes.func.isRequired,
    checkUserIsConnected: PropTypes.func.isRequired
  };

  state = {
    collapsed: true
  };

  componentWillMount(){
    this.getMachines();
  }

  getMachines = async () => {
    const { updateMachines, getMachines } = this.props;
    const response = await getMachines();
    const allMachines = response.payload.data;
    updateMachines(allMachines);
  };

  onCollapse = () => {
    const { collapsed } = this.state;
    const collapsedNew = !collapsed;

    this.setState({ collapsed:collapsedNew });
  };

  goToReader = () =>{
    const { history } = this.props;
    this.onCollapse();
    history.push('/');
  };

  goToForm = (machineName) =>{
    const { history } = this.props;
    this.onCollapse();
    history.push('/report/'+machineName.props.item);
  };

  render() {
    const { collapsed } = this.state;
    const { machines, isAuthenticated, disconnectUser, checkUserIsConnected, currentView } = this.props;
    return (
      <div id="appContainer">
        <Layout style={{ minHeight: '100vh' }}>
          <NavigationBar itemList={machines} collapsedNav={collapsed} handleToForm={this.goToForm} handleReturn={this.goToReader}/>
          <Layout>
            <Content className={styles.backgroundApp}>
              <MainRoutes disconnectUser={disconnectUser} checkUserIsConnected={checkUserIsConnected}/>
            </Content>
            <Footer isAuthenticated={isAuthenticated} currentView={currentView}/>
            <Affix offsetTop={0} offsetBottom={0} onChange={affixed => console.log(affixed)}>
              <Button className={styles.darkButton} onClick={this.onCollapse} >{collapsed?'Afficher Menu':'Cacher Menu'}</Button>
            </Affix>
          </Layout>
          <BackTop />
        </Layout>
      </div>
    );
  }
}

export default App;
