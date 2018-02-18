import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter, Link } from 'react-router-dom';

class MobileNav extends Component {
	render() {
		return (
			<div className="container">
				<NavBar
					style={{ padding: 10 }}
					mode="light"
					icon={<Icon type="left" />}
					onLeftClick={() => console.log('onLeftClick')}
					rightContent={[<Icon key="1" type="ellipsis" />]}>
					<Link to={{ pathname: '/' }}>
						<img
							className="mobile-logo"
							src="https://cdn.shopify.com/s/files/1/2473/6554/files/Logo_2.png?6211363330978790612"
						/>
					</Link>
				</NavBar>
			</div>
		);
	}
}

export default withRouter(MobileNav);
