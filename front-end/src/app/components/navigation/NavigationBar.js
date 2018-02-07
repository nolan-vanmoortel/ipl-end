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

    itemList: PropTypes.array,
  };

  // eslint-disable-next-line no-undef
  handleClick = () => {
    const { handleReturn } = this.props;
    handleReturn();
  };

  handleClickMenu = (e) => {
    const { handleToForm } = this.props;
    handleToForm(e.item);
  };

  generateMenuItems = (location) => {
    const {itemList} = this.props;
    const toReturn = [];
    itemList.map((machine, index) => {
      if (machine.location === location){
        toReturn.push( <Menu.Item item={machine.name} key={index+1} >
          {machine.name}
        </Menu.Item>);
      }
    });
    return toReturn;
  };

  generateMenu = () => {
    const {itemList} = this.props;
    const toReturn = [];
    const locationList = [];
    itemList.map((m) => {
      if (!locationList.includes(m.location)) {
        locationList.push(m.location);
      }
    });

    locationList.map((location, index) => {
      const myItems = this.generateMenuItems(location);
      toReturn.push(<SubMenu
        key={index+1}
        title={<span><Icon type="home" /><span>{location}</span></span>}
      >
        {myItems}
      </SubMenu>);
    });

    return (<Menu onClick={this.handleClickMenu} theme="dark" mode="inline">
        {toReturn}
    </Menu>);
  };


  render() {
    const { collapsedNav } = this.props;
    const menu = this.generateMenu();
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

