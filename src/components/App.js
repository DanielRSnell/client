// Required
/* eslint guard-for-in: 0 */
/* eslint no-console: 0 */
// or just take everything!
// Reqirements

import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Layout, Row } from 'antd';
import '../style/app.css';
import 'antd/dist/antd.css';
import 'antd-mobile/dist/antd-mobile.css';
// Navigation

import MainNav from './nav/MainNav';
import SubNav from './nav/SubNav';

// Other Pre-Render Options

import Home from './pages/Home';

// Profile Pages

import Cryptocurrency from './pages/Cryptocurrency';
import IcoProfile from './pages/IcoProfile';

// ICO Tables

import IcoList from './pages/IcoList';

// Testing Grounds - Where we build things
import Test from '../test/test';

// Mobile Imports
import MobileNav from './mobile/nav';
import MobileHome from './mobile/home/home';
import Status from './status';
const { Footer } = Layout;

// View State Starts Here

class App extends Component {
	constructor() {
		super();
		this.state = {
			width: window.innerWidth
		};
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleWindowSizeChange);
	}

	handleWindowSizeChange = () => {
		this.setState({ width: window.innerWidth });
	};

	render() {
		const { width } = this.state;
		const isMobile = width <= 500;

		if (isMobile) {
			return (
				<Layout>
					<BrowserRouter>
						<Row>
							<MobileNav />
							<Route exact={true} path="/" component={MobileHome} />
							<Footer style={{ textAlign: 'center' }}>
								<strong>Hackcoin</strong> ©2017 <strong>Kickass Data</strong>{' '}
								and <strong>Unicorns</strong>.
							</Footer>
						</Row>
					</BrowserRouter>
				</Layout>
			);
		} else {
			return (
				<Layout>
					<BrowserRouter>
						<Row>
							<Status />
							<MainNav />
							<SubNav />
							<Route exact={true} path="/" component={Home} />
							<Route
								exact={true}
								path="/cryptocurrency/:id"
								component={Cryptocurrency}
							/>
							<Route exact={true} path="/all-icos" component={IcoList} />
							<Route exact={true} path="/ico/:id" component={IcoProfile} />
							<Route exact={true} path="/test" component={Test} />
							<Footer style={{ textAlign: 'center' }}>
								<strong>Hackcoin</strong> ©2017 <strong>Kickass Data</strong>{' '}
								and <strong>Unicorns</strong>.
							</Footer>
						</Row>
					</BrowserRouter>
				</Layout>
			);
		}
	}
}
// eslint-disable-next-line
export default App;
