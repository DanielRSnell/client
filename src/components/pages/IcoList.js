import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Spin, Layout, Row } from 'antd';
import IcoTable from '../widgets/tables/IcoTable';
import mixpanel from 'mixpanel-browser';
import MetaTags from 'react-meta-tags';

const { Content } = Layout;

class IcoList extends Component {
	state = {
		loading: false
	};

	InitMix() {
		console.log(`Mixpanel`);
		mixpanel.init('d7b8b0e988ae095fe996e068780eac11');
		mixpanel.track('Page View', { Page: 'ICO List' });
	}

	render() {
		if (this.props.ico_main.loading) {
			console.log(`props is loading`);

			return (
				<div className="example">
					<MetaTags>
						<title>Hackcoin - Top ICOs for 2018</title>
						<meta
							id="meta-description"
							name="description"
							content={`Check out top icos for 2018 with Hackcoin. Hackcoin provides data and information on blockchain, ICO, as well as crypto market data.`}
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
					<Spin tip="HOLD YOUR UNICORNS! IT'S LOADING!" />
				</div>
			);
		} else {
			console.log(`Data has loaded`);
			console.log(this.props);
		}

		return (
			<Content style={{ margin: 10 }}>
				{this.InitMix()}
				<MetaTags>
					<title>Hackcoin - Top ICOs for 2018</title>
					<meta
						id="meta-description"
						name="description"
						content={`Check out top icos for 2018 with Hackcoin. Hackcoin provides data and information on blockchain, ICO, as well as crypto market data.`}
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
				<Row className="ico-table">
					<IcoTable icos={this.props} />
				</Row>
			</Content>
		);
	}
}

const query = gql`
	query IcoCoinProfiles {
		allIcoProfiles {
			id
			name
			rating
			logo
			start
			end
			prestart
			preend
			icoFinance {
				platform
			}
		}
	}
`;

export default graphql(query, { name: 'ico_main' })(IcoList);
