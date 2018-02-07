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
    getMachines: PropTypes.func.isRequired,
    updateMachines: PropTypes.func.isRequired
  };

  state = {
    collapsed: true,
  };

  constructor() {
    super();
    this.getMachines();
  }

  getMachines = async () => {
    const { updateMachines, getMachines } = this.props;
    const response = await getMachines;
    const {
      data: {
        allMachines
      }
    } = response.payload;
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
    history.push('/report/'+machineName );
  };



  render() {
    const { collapsed, allMachines } = this.state;
    console.log(allMachines);

    return (
      <div id="appContainer">
        <Layout style={{ minHeight: '100vh' }}>
          <NavigationBar itemList={allMachines} collapsedNav={collapsed} handleToForm={this.goToForm} handleReturn={this.goToReader}/>
          <Layout>
            <Content className={styles.backgroundApp}>
              <MainRoutes />
            </Content>
            <Footer/>
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
