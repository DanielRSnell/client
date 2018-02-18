import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import CoinList from './coinlist';

class MobileHome extends Component {
	render() {
		const data = this.props.coins.allCoinProfiles;
		const glob = this.props.coins.global;

		if (this.props.coins.loading) {
			return <div>Loading...</div>;
		} else {
			return <CoinList coins={data} />;
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
