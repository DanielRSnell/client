import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import CoinList from './coinlist';
import { Spin } from 'antd';
import mixpanel from 'mixpanel-browser';
import MetaTags from 'react-meta-tags';

class MobileHome extends Component {
	InitMix() {
		console.log(`Mixpanel`);
		mixpanel.init('d7b8b0e988ae095fe996e068780eac11');
		mixpanel.track('Page View', { Page: 'Home' });
	}

	render() {
		const data = this.props.coins.fetchCoins;

		if (this.props.coins.loading) {
			return (
				<div className="example">
					<Spin tip="HOLD YOUR UNICORNS! IT'S LOADING!" />
				</div>
			);
		} else {
			return (
				<div className="flex-container">
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
					<CoinList coins={data} />
				</div>
			);
		}
	}
}

const query = gql`
	query Home {
		fetchCoins(coin: "all") {
			id
			rank
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

export default graphql(query, { name: 'coins' })(MobileHome);
