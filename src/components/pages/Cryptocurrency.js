import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Layout, Row, Col, Tag, Spin, Divider, Tabs, Icon, Table } from 'antd';
import CoinBySymbol from './query/CoinBySymbol';
import CandleChart from '../widgets/charts/CandleStick';
import QuadBar from '../widgets/data/QuadBar';
import { Timeline } from 'react-twitter-widgets';
import TradingViewWidget from 'react-tradingview-widget';
import * as n from 'numeral';
import mixpanel from 'mixpanel-browser';
import MetaTags from 'react-meta-tags';

const TabPane = Tabs.TabPane;

function callback(key) {
	console.log(key);
}

class Cryptocurrency extends Component {
	state = {
		loading: true,
		data: null
	};

	toggle = value => {
		this.setState({ loading: value });
	};

	CreateSubheader(props) {
		return (
			<span>
				<strong>SYMBOL</strong> - {props.symbol}
			</span>
		);
	}

	InitMix() {
		console.log(`Mixpanel`);
		mixpanel.init('d7b8b0e988ae095fe996e068780eac11');
		mixpanel.track('Page View', { Page: 'Coin Page' });
	}

	CreateMarkup(props) {
		if (props.comparePage !== null) {
			if (props.comparePage.desc !== null) {
				const rawMarkup = this.props.data.allCoinProfiles[0].comparePage.desc;

				const format = rawMarkup.split('<strong>').join('<p></br><strong>');

				const reformat = format.split('</strong>').join('</strong></p>');

				return { __html: reformat };
			} else {
				const rawMarkup = '<h3>No content added, would you like to add?</h3>';

				return { __html: rawMarkup };
			}
		} else {
			const rawMarkup = '<h3>No content added, would you like to add?</h3>';

			return { __html: rawMarkup };
		}
	}

	CreateTwitter(props) {
		if (props.allCoinProfiles[0].comparePage !== null) {
			if (props.allCoinProfiles[0].comparePage.twitter !== null) {
				const check = props.allCoinProfiles[0].comparePage.twitter.includes(
					'@'
				);
				const Format = props.allCoinProfiles[0].comparePage.twitter
					.split('@')
					.join('');

				if (check === true) {
					return (
						<Timeline
							dataSource={{
								sourceType: 'profile',
								screenName: `${Format}`
							}}
							options={{
								username: `${Format}`,
								height: '700'
							}}
							onLoad={() => console.log('Timeline is loaded')}
						/>
					);
				} else {
					return (
						<Col className="ico-video-asset">
							<center>
								<h3 className="ico-video-message">
									<Icon type="twitter" fontSize={24} /> Not Available
								</h3>
							</center>
						</Col>
					);
				}
			} else {
				return (
					<Col className="ico-video-asset">
						<center>
							<h3 className="ico-video-message">
								<Icon type="twitter" fontSize={24} /> Not Available
							</h3>
						</center>
					</Col>
				);
			}
		} else {
			return (
				<Col className="ico-video-asset">
					<center>
						<h3 className="ico-video-message">
							<Icon type="twitter" fontSize={24} /> Not Available
						</h3>
					</center>
				</Col>
			);
		}
	}

	MountImage(props) {
		return (
			<img
				className="coin-profile-image"
				src={`https://files.coinmarketcap.com/static/img/coins/64x64/${
					this.props.data.allCoinProfiles[0].rank
				}.png`}
			/>
		);
	}

	CreateExchangeList(props) {
		const Columns = [
			{
				title: 'EXCHANGE',
				dataIndex: 'exchange',
				key: 'exchange'
			},
			{
				title: 'HIGH',
				dataIndex: 'high',
				key: 'high'
			},
			{
				title: 'LOW',
				dataIndex: 'low',
				key: 'low'
			},
			{
				title: 'CURRENT',
				dataIndex: 'price',
				key: 'price'
			}
		];

		if (props.compareExchangeses.length > 0) {
			const data = props.compareExchangeses;

			return (
				<Col
					className="profile-coin-bottom"
					span={22}
					push={1}
					style={{ padding: 20 }}>
					<Table
						size="small"
						bordered={true}
						indentSize={20}
						dataSource={data}
						columns={Columns}
						rowKey={item => item.exid}
					/>
				</Col>
			);
		}
	}

	CreateFinanceData(props) {
		console.log(props);

		if (props.coinstats !== null || undefined) {
			if (props.allCoinProfiles[0].compareList !== null || undefined) {
				return (
					<Row>
						<Row span={24}>
							<Col span={4}>
								<strong>Name :</strong>{' '}
							</Col>
							<Col span={4}>
								{this.CheckNullString(props.allCoinProfiles[0].name)}
							</Col>
						</Row>

						<Divider />
						<Row span={24}>
							<Col span={4}>
								<strong>Algorithm :</strong>{' '}
							</Col>
							<Col span={4}>
								{this.CheckNullString(
									props.allCoinProfiles[0].compareList.algo
								)}
							</Col>
						</Row>

						<Divider />

						<Row span={24}>
							<Col span={4}>
								<strong>Proof Type :</strong>{' '}
							</Col>
							<Col span={4}>
								{this.CheckNullString(
									props.allCoinProfiles[0].compareList.prooftype
								)}
							</Col>
						</Row>

						<Divider />
						<Row span={24}>
							<Col span={4}>
								<strong>Marketcap :</strong>{' '}
							</Col>
							<Col span={4}>
								{this.LargeConvertDollar(props.coinstats.market_cap)}
							</Col>
						</Row>

						<Divider />
						<Row span={24}>
							<Col span={4}>
								<strong>Volume :</strong>{' '}
							</Col>
							<Col span={4}>
								{this.LargeConvertDollar(props.coinstats.volume)}
							</Col>
						</Row>

						<Divider />
						<Row span={24}>
							<Col span={4}>
								<strong>Max Supply :</strong>{' '}
							</Col>
							<Col span={4}>
								{this.LargeNumber(props.allCoinProfiles[0].max)}
							</Col>
						</Row>

						<Divider />
						<Row span={24}>
							<Col span={4}>
								<strong>Total Supply:</strong>{' '}
							</Col>
							<Col span={4}>
								{this.LargeNumber(props.allCoinProfiles[0].total)}
							</Col>
						</Row>

						<Divider />
						<Row span={24}>
							<Col span={6}>
								<strong>Circulating Supply :</strong>{' '}
							</Col>
							<Col span={4}>
								{this.LargeNumber(props.allCoinProfiles[0].circulating)}
							</Col>
						</Row>

						<Divider />
						<Row span={24}>
							<Col span={5}>
								<strong>VWAP 24 Hours:</strong>{' '}
							</Col>
							<Col span={4}>
								{this.LargeConvertDollar(props.coinstats.vwap_h24)}
							</Col>
						</Row>
					</Row>
				);
			}
		}
	}

	LargeConvertDollar(props) {
		if (props !== null || undefined) {
			const number = n(props);
			n.defaultFormat(`$0,0.00`);
			const reFormat = number.format();
			return <span className="stat-number">{reFormat}</span>;
		} else {
			return (
				<span className="stat-number">
					<Tag color="volcano">UNKNOWN</Tag>
				</span>
			);
		}
	}

	LargeNumber(props) {
		if (props !== null || undefined) {
			const number = n(props);
			n.defaultFormat(`0,0`);
			const reFormat = number.format();
			return <span className="stat-number">{reFormat}</span>;
		} else {
			return (
				<span className="stat-number">
					<Tag color="volcano">UNKNOWN</Tag>
				</span>
			);
		}
	}

	CheckNullString(props) {
		if (props === '') {
			return 'Unknown';
		} else if (props === ' ') {
			return 'Unknown';
		} else if (props === undefined) {
			return 'Unknown';
		} else if (props === 'undefined') {
			return 'Unknown';
		} else if (props === null) {
			return 'Unknown';
		} else {
			return props;
		}
	}

	CheckSymbol(props, currency) {
		if (props === '') {
			return 'Unknown';
		} else if (props === ' ') {
			return 'Unknown';
		} else if (props === undefined) {
			return 'Unknown';
		} else if (props === 'undefined') {
			return 'Unknown';
		} else if (props === null) {
			return 'Unknown';
		} else {
			if (props === 'BTC') {
				return 'BTCUSD';
			} else {
				return `${props}BTC`;
			}
		}
	}

	render() {
		const data = this.props.data.allCoinProfiles;
		console.log(data);

		return (
			<div>
				{!data && (
					<div className="example">
						<Spin tip="HOLD YOUR UNICORNS! IT'S LOADING!" />
					</div>
				)}
				{data &&
					data.map(item => (
						<Layout className="container">
							{this.InitMix()}
							<MetaTags>
								<title>
									{this.props.data.allCoinProfiles[0].name} -{' '}
									{this.props.data.allCoinProfiles[0].symbol} cryptocurrency and
									blockchain data.
								</title>
								<meta
									id="meta-description"
									name="description"
									content={`Learn about ${
										this.props.data.allCoinProfiles[0].symbol
									} cryptocurrency and other related blockchain projects and market data with the hackcoin crypto research community.`}
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
							<Row span={24} style={{ margin: 10 }}>
								<Col span={22} push={1} style={{ padding: 0 }}>
									<Col span={2}>{this.MountImage(this.props.data)}</Col>
									<Col span={12}>
										<Row>
											<span className="coin-profile-header">
												{this.props.data.allCoinProfiles[0].name}
											</span>
										</Row>
										<Row>
											<span className="coin-profile-subheader">
												{this.CreateSubheader(
													this.props.data.allCoinProfiles[0]
												)}
											</span>
										</Row>
									</Col>
								</Col>
							</Row>

							<Row
								span={24}
								type="flex"
								justify="center"
								style={{ margin: 10 }}>
								<Col
									className="profile-stat-box-section"
									span={22}
									style={{ padding: 0 }}>
									<Col style={{ margin: 0, padding: 0 }}>
										<Tabs defaultActiveKey="1" onChange={callback}>
											<TabPane tab="USD" key="1">
												<CandleChart coins={this.props} />
											</TabPane>
											<TabPane tab="TRADING VIEW" key="4">
												<TradingViewWidget
													width="100%"
													theme="Dark"
													interval="5"
													symbol={`
                ${this.CheckSymbol(
									this.props.data.allCoinProfiles[0].symbol,
									'BTC'
								)}`}
												/>
											</TabPane>
										</Tabs>
									</Col>
								</Col>
							</Row>
							<QuadBar data={this.props} />

							<Row span={24} justify="center" style={{ margin: 10 }}>
								<Row>
									<Col className="profile-coin-bottom" span={22} push={1}>
										<Col className="profile-about-section" span={12} push={1}>
											<Tabs>
												<TabPane tab="ABOUT" key="1">
													<span className="profile-about-content">
														<h1>
															<strong>About</strong> :{' '}
															{this.props.data.allCoinProfiles[0].name}
														</h1>
													</span>

													<div
														className="ico-about-page"
														dangerouslySetInnerHTML={this.CreateMarkup(
															this.props.data.allCoinProfiles[0]
														)}
													/>
												</TabPane>

												<TabPane tab="FINANCIAL" key="4">
													{this.CreateFinanceData(this.props.data)}
												</TabPane>
											</Tabs>

											<Divider />
										</Col>

										<Col
											span={7}
											push={3}
											className="twitter-widget-holder"
											style={{ margin: 10, minHeight: 700, minWidth: 350 }}>
											<div className="twitter-header">
												{this.CreateTwitter(this.props.data)}
											</div>
										</Col>
									</Col>
								</Row>
								<Row
									span={24}
									justify="center"
									style={{ margin: 10, padding: 0 }}>
									{this.CreateExchangeList(item)}
								</Row>
							</Row>
						</Layout>
					))}
			</div>
		);
	}
}

export default graphql(CoinBySymbol, {
	options: props => {
		return { variables: { symbol: props.match.params.id } };
	}
})(Cryptocurrency);
