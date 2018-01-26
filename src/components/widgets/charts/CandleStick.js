import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as m from 'moment';
import { Layout, Row, Col, Divider } from 'antd';
import Highcharts from 'highcharts/highstock';
import ChartSide from '../data/ChartSide';
import n from 'numeral';

const { Content } = Layout;

// Load Highmaps as a module
require('highcharts/modules/map')(Highcharts);

class CandleChart extends Component {

	constructor(props) {
		super(props);
	}
	
	state = {
		ohlc_data: null,
		volume_data: null,
	}

	// Error Handling

	componentDidCatch(error, info) {
		
		// Is there an error?
		console.log(error);
		
		// Tell about it if so!
		console.log(info);
	}
	
	componentDidMount() {
		console.log(`Component has landed`);
		this.PrepareData();
		this.setState({ loading: true });
	}
	
	PrepareData() {
	
		const Values = this.props.coins.data.coin_charts;
		
		const itemName = this.props.coins.data.coin_bySymbol.profile.name;
		
		this.loadChart( Values, itemName )
	}

	//Props Passed 

	loadChart(itemHist, itemName) {

		const ohlcData = [];
		const volumeData = [];
		
	// Splitting the data set	
	
		itemHist.forEach(item => {

		// Organize OHLC Data
		if ( item.open > 0 ) {

			ohlcData.push([ 
				m.unix(item.time).valueOf(),
				item.open,
				item.high,
				item.low,
				item.close
		]);
			volumeData.push([
				
				m.unix(item.time).valueOf(), // date
				
				item.volumeto // Volume
			]);
			}
		});


		Highcharts.stockChart(
			'loading', {

			rangeSelector: {
				selected: 0
			}, 
			
			credits: {
				enabled: false
			  },

			yAxis: [
				{
					labels: {
						align: 'right',
						x: -3
					},
					title: {
						text: 'OHLC'
					},
					height: '100%',
					lineWidth: 4,
					resize: {
						enabled: true
					}
				},
				{
					labels: {
						align: 'right',
						x: -3
					},
					title: {
						text: 'Volume'
					},
					top: '100%',
					height: '35%',
					offset: 0,
					lineWidth: 2
				}
			],

			tooltip: {
				split: true
			},

			series: [
				{
					type: 'candlestick',
					name: itemName,
					data: ohlcData
				},
				{
					type: 'column',
					name: 'Volume',
					data: volumeData,
					yAxis: 1
				}
			]
		});
}

	

// Render the data unless data is still pending -- as needed

	render() {

	// Pending is not required for Candle / Loading 
	console.log(this.props);
	// Post the data 		
			
		return (
			

		<Row span={24} type="flex" justify="center" style={{margin: 10}}>

				<Col className="profile-stat-box-section" span={22} style={{ padding: 10}}>

				<Col style={{margin: 5, padding: 10}}>

				<div id="loading" />
				
				</Col>
	
	</Col>
			
</Row>
			
		);
	}
}


export default CandleChart;
