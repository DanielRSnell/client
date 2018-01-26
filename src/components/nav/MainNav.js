import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

class MainNav extends Component {
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
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
      <Menu.Item 
            key="logo"
		    className="menu-logo">
         <Link to={{pathname: '/'}}> <Icon type="BTC" /><img className="brand-logo" src='https://cdn.shopify.com/s/files/1/2473/6554/files/Logo_2.png?6211363330978790612' /></Link>
        </Menu.Item>
        <Menu.Item key="link-1" className="item-left">
            ROADMAP
        </Menu.Item>
        <Menu.Item key="link-2" className="item-left">
            ABOUT
        </Menu.Item>
        <Menu.Item key="link-3" className="item-left">
            MISSION
        </Menu.Item>
        <Menu.Item key="link-4" className="item-left">
            BLOG
        </Menu.Item>
        <Menu.Item key="link-5" className="item-left">
        <Icon type="github" /> API
    </Menu.Item>

      </Menu>
    );
  }
}

export default withRouter(MainNav);