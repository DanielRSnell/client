import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

class SubNav extends Component {
  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <Menu
        theme="dark"
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
      <Menu.Item 
            key="logo"
            className="menu-logo">
        <Link to={{pathname: '/'}}> <Icon type="BTC" />ICO INFORMATION NOW AVAILABLE :</Link>
        </Menu.Item>
        <Menu.Item key="link-4" className="item-left">
          <Link to="/all-icos">ALL ICOS</Link>
        </Menu.Item>
        <Menu.Item key="link-5" className="item-left">
        <Link to="/">TOP COINS</Link>
      </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(SubNav);