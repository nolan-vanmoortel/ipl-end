// @flow weak

import React,
{ PureComponent }       from 'react';
import PropTypes          from 'prop-types';
import {Layout, Menu, Icon, Button} from 'antd';
import styles from './NavigationBar.scss';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;


class NavigationBar extends PureComponent {
  // eslint-disable-next-line no-undef
  static propTypes = {
    collapsedNav: PropTypes.bool.isRequired,
    handleReturn: PropTypes.func.isRequired,
    handleToForm: PropTypes.func.isRequired,

    itemList: PropTypes.array
  };

  // eslint-disable-next-line no-undef
  handleClick = () => {
    const { handleReturn } = this.props;
    handleReturn();
  };

  handleClickMenu = (machineName) => {
    const { handleToForm } = this.props;
    handleToForm(machineName);
  };

  generateMenu = () => {
    const {itemList} = this.props;
    const test = [];
    itemList.map((machine, index) => {
      test.push(<Menu.Item key={index+1} >
        Machine {machine.name}
      </Menu.Item>);

    });

    return (<Menu onClick={this.handleClickMenu} theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <SubMenu
        key="1"
        title={<span><Icon type="home" /><span>Test</span></span>}
      >
        {test}
      </SubMenu>
    </Menu>);
  };

  render() {
    const { collapsedNav } = this.props;
    const menu = this.generateMenu();
    console.log(menu);
    return (
      <Sider style={{display:collapsedNav?'none':'block'}} >
        <div className={styles.logo}>
          <Button size="large" type="primary" style={{width:'100%'}} onClick={this.handleClick}>
            <Icon type="left" />Scanner QR code
          </Button>
        </div>
        {menu}
      </Sider>
    );
  }
}

export default NavigationBar;
