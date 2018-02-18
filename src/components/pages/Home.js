import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Select, Spin, Row, Col, Layout, Divider } from 'antd';
import CoinsRanked from '../widgets/tables/CoinsRanked';
import SearchInput from '../widgets/function/SearchInput';
import n from 'numeral';
import m from 'moment';
import mixpanel from 'mixpanel-browser';
import MetaTags from 'react-meta-tags';

const Option = Select.Option;

const { Content } = Layout;

class Home extends Component {
	toggle = value => {
		this.setState({ loading: value });
	};

	InitMix() {
		console.log(`Mixpanel`);
		mixpanel.init('d7b8b0e988ae095fe996e068780eac11');
		mixpanel.track('Page View', { Page: 'Home' });
	}

	GetTime(props) {
		const reFormat = m.unix(props);
		const DateFormat = m(reFormat).format('lll');
		return DateFormat;
	}

	ConvertDollar(props) {
		const number = n(props);
		n.defaultFormat(`$0,0`);
		const reFormat = number.format();
		return <span className="global-bar">{reFormat}</span>;
	}

	CheckMarketCap(props) {
		if (props.global !== undefined) {
			return this.ConvertDollar(props.global.marketcap);
		} else {
			return 'Loading....';
		}
	}

	CheckDom(props) {
		if (props.global !== undefined) {
			return <span> {props.global.dom + '%'} </span>;
		} else {
			return 'Loading....';
		}
	}

	CheckVolume(props) {
		if (props.global !== undefined) {
			return this.ConvertDollar(props.global.volume);
		} else {
			return 'Loading....';
		}
	}

	render() {
		const data = this.props.coins;
		const glob = this.props.coins.global;

		return (
			<div>
				{!glob && (
					<Content style={{ margin: 10 }}>
						<MetaTags>
							<title>Hackcoin - Top Cryptocurrencies 2018.</title>
							<meta
								id="meta-description"
								name="description"
								content="Check out the top cryptocurrencies 2018 - Hackcoin provides information on ICOs, Blockchain, and open market cryptos data."
							/>
							<meta
								id="og-title"
								property="og:title"
								content="Hackcoin - Cryptocurrency Done Better."
							/>
							<meta
								id="og-image"
								property="og:image"
								content="https://cdn.shopify.com/s/files/1/2473/6554/files/Logo_2.png?6211363330978790612"
							/>
						</MetaTags>
						{this.InitMix()}
						<Row span={24} type="flex" className="filter-home">
							<Col span={5} style={{ margin: 10 }}>
								<Content
									className="home-global-item"
									style={{ padding: 0, margin: 5, minHeight: 48 }}>
									<strong>TOTAL MARKETCAP:</strong>{' '}
									{this.CheckMarketCap(this.props.coins)}
								</Content>
							</Col>
							<Col span={5} style={{ margin: 10 }}>
								<Content
									className="home-global-item"
									style={{ padding: 0, margin: 5, minHeight: 48 }}>
									<strong>DAILY VOLUME:</strong>{' '}
									{this.CheckVolume(this.props.coins)}
								</Content>
							</Col>
							<Col span={5} style={{ margin: 10 }}>
								<Content
									className="home-global-item"
									style={{ padding: 0, margin: 5, minHeight: 48 }}>
									<strong>BITCOIN DOMINANCE:</strong>{' '}
									{this.CheckDom(this.props.coins)}
								</Content>
							</Col>
							<Col span={5} push={4} style={{ margin: 10 }}>
								<SearchInput
									className="search-input"
									data={this.props}
									placeholder="Search Your Coins"
									style={{ width: 215 }}
								/>
							</Col>
						</Row>
						<Row className="example" justify="center">
							<Spin tip="HOLD YOUR UNICORNS! IT'S LOADING!" />
						</Row>
					</Content>
				)}
				{glob && (
					<Content style={{ margin: 10 }}>
						<Row span={24} type="flex" className="filter-home">
							<Col span={5} style={{ margin: 10 }}>
								<Content
									className="home-global-item"
									style={{ padding: 0, margin: 5, minHeight: 48 }}>
									<strong>TOTAL MARKETCAP:</strong>{' '}
									{this.CheckMarketCap(this.props.coins)}
								</Content>
							</Col>
							<Col span={5} style={{ margin: 10 }}>
								<Content
									className="home-global-item"
									style={{ padding: 0, margin: 5, minHeight: 48 }}>
									<strong>DAILY VOLUME:</strong>{' '}
									{this.CheckVolume(this.props.coins)}
								</Content>
							</Col>
							<Col span={5} style={{ margin: 10 }}>
								<Content
									className="home-global-item"
									style={{ padding: 0, margin: 5, minHeight: 48 }}>
									<strong>BITCOIN DOMINANCE:</strong>{' '}
									{this.CheckDom(this.props.coins)}
								</Content>
							</Col>
							<Col span={5} push={4} style={{ margin: 10 }}>
								<SearchInput
									className="search-input"
									data={this.props}
									placeholder="Search Your Coins"
									style={{ width: 200 }}
								/>
							</Col>
						</Row>
						<Row>
							<CoinsRanked data={this.props} loading={false} />
						</Row>
					</Content>
				)}
			</div>
		);
	}
}

const query = gql`
	query Home {
		allCoinProfiles(orderBy: rank_ASC) {
			id
			rank
			cmc
			name
			symbol
			price
			hour
			day
			week
			marketcap
			volume
		}
		global {
			marketcap
			volume
			dom
		}
	}
`;

export default graphql(query, { name: 'coins' })(Home);

