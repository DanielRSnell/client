import React, { Component } from 'react';
import { Row, Col, Layout, Table } from 'antd';
import n from 'numeral';

const { Content } = Layout;
const { Column } = Table;

class CoinsRanked extends Component {
	state = {
		data: null,
		PageSize: 100,
		filteredInfo: null,
		sortedInfo: null
	};

	handleChange = value => {
		this.setState({ value });
		fetch(value, data => this.setState({ data }));
	};

	// Error Handling

	componentDidCatch(error, info) {
		// Is there an error?
		console.log(error);

		// Tell about it if so!
		console.log(info);
	}

	handleChange = (pagination, filters, sorter) => {
		console.log('Various paramaters', pagination, filters, sorter);
		this.setState({
			filteredInfo: filters,
			sortedInfo: sorter
		});
	};

	componentWillMount() {
		if (this.props.loading === false) {
			this.setState({ PageSize: 2000 });
			this.setState({ loading: false });
		} else {
			this.setState({ loading: true });
		}
	}

	priceColor(props) {
		if (props !== null) {
			if (props !== undefined) {
				const itemName = props.toString();

				const checkStatus = itemName.includes('-');

				if (checkStatus !== true) {
					return (
						<span>
							<strong>
								<font color="green">{props}</font> %
							</strong>
						</span>
					);
				} else {
					return (
						<span>
							<strong>
								<font color="red">{props}</font> %
							</strong>
						</span>
					);
				}
			} else {
				return (
					<span>
						<strong>
							<font color="gray">{props}</font> %
						</strong>
					</span>
				);
			}
		}
	}

	ConvertDollar(props) {
		const number = n(props);
		n.defaultFormat(`$0,0.00`);
		const reFormat = number.format();
		return (
			<span>
				<strong>{reFormat}</strong>
			</span>
		);
	}

	LargeConvertVolume(props) {
		if (props !== null) {
			const convertNumber = parseInt(props);
			const number = n(convertNumber);
			n.defaultFormat(`$0,0`);
			const reFormat = number.format();
			return (
				<span>
					<strong>{reFormat}</strong>
				</span>
			);
		} else {
			return 'Unknown';
		}
	}

	LargeConvertMarket(props) {
		if (props !== null) {
			const convertNumber = parseInt(props);
			const number = n(convertNumber);
			n.defaultFormat(`$0,0`);
			const reFormat = number.format();
			return (
				<span>
					<strong>{reFormat}</strong>
				</span>
			);
		} else {
			return 'Unknown';
		}
	}

	CheckSymbol(props) {
		if (props !== 'MIOTA') {
			return (
				<span>
					( <strong>{props}</strong> ){' '}
				</span>
			);
		} else {
			return (
				<span>
					( <strong>IOT</strong> ){' '}
				</span>
			);
		}
	}

	rowClickHandler(symbol) {
		if (symbol !== 'MIOTA') {
			this.props.data.history.push('/cryptocurrency/' + symbol);
		} else {
			this.props.data.history.push('/cryptocurrency/IOT');
		}
	}

	CreateImageItem(props) {

		if ( props !== "IOT" ) {

			return ( <img className="table-image-2" src={`https://www.livecoinwatch.com/images/icons32/${props.toLowerCase()}.png`} /> );

		} else {

			return ( <img className="table-image-2" src={`https://www.livecoinwatch.com/images/icons32/iota.png`} /> );

		}

	}

	render() {
		const data = this.props.data.coins.allCoinProfiles;
		console.log(data);

		return (
			// <div> This is a test div </div>
			<Row type="flex" span={24} justify="center">
				<Col span={24} value={5}>
					<Content
						style={{
							background: '#fff',
							padding: 0,
							margin: 0,
							minHeight: 280
						}}>
						<Table
							loading={this.props.loading}
							size="default"
							bordered={false}
							indentSize={20}
							pagination={{ pageSize: 2000 }}
							dataSource={data}
							onRowClick={item => this.rowClickHandler(item.symbol)}
							rowKey={item => item.id}
							onChange={this.handleChange}>
							<Column
								key="rank"
								title="RANK"
								render={item => {
									return <center>{item.rank}</center>;
								}}
							/>

							<Column
								key="id"
								render={item => (
									this.CreateImageItem(item.symbol)
								)}
							/>

							<Column key="name" render={item => item.name} />

							<Column
								key="volume"
								title="VOLUME"
								render={item => {
									return this.LargeConvertVolume(item.volume);
								}}
							/>

							<Column
								key="market_cap_usd"
								title="MARKET CAP"
								render={item => {
									return this.LargeConvertMarket(item.marketcap);
								}}
							/>

							<Column
								key="price_usd"
								title="PRICE"
								render={item => {
									return this.ConvertDollar(item.price);
								}}
							/>

							<Column
								key="percent_change_1h"
								title="HOUR"
								render={item => {
									return this.priceColor(item.hour);
								}}
							/>

							<Column
								key="percent_change_24h"
								title="DAILY"
								render={item => {
									return this.priceColor(item.day);
								}}
							/>

							<Column
								key="percent_change_7d"
								title="WEEKLY"
								render={item => {
									return this.priceColor(item.week);
								}}
							/>

							<Column
								key="symbol"
								title="TICKER"
								render={item => {
									return this.CheckSymbol(item.symbol);
								}}
							/>
						</Table>
					</Content>
				</Col>
			</Row>
		);
	}
}

export default CoinsRanked;
