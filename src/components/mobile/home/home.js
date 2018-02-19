import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import CoinList from './coinlist';
import { Spin } from 'antd';
import { WhiteSpace } from 'antd-mobile';

class MobileHome extends Component {
	render() {
		const data = this.props.coins.allCoinProfiles;
		const glob = this.props.coins.global;

		if (this.props.coins.loading) {
			return (
				<div className="example">
					<Spin tip="HOLD YOUR UNICORNS! IT'S LOADING!" />
				</div>
			);
		} else {
			return (
				<div className="flex-container">
					<CoinList coins={data} />
				</div>
			);
		}
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

export default graphql(query, { name: 'coins' })(MobileHome);
