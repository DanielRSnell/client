import React, { Component } from 'react';
import * as m from 'moment';
import { Layout, Row, Col } from 'antd';
import Highcharts from 'highcharts/highstock';

// Load Highmaps as a module
require('highcharts/modules/map')(Highcharts);

class CandleChart extends Component {
	
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
		this.PrepareData();
		this.setState({ loading: true });
	}
	
	PrepareData() {
	
		const Values = this.props.coins.data.history;
		
		this.loadChart( Values )
	}

	//Props Passed 

	loadChart( itemHist ) {

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
					name: this.props.coins.data.allCoinProfiles[0].name,
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
	
	
	// Post the data 		
			
		return (
			

		<Row span={24} type="flex" justify="center" style={{margin: 0}}>

				<Col className="profile-stat-box-section" span={24} style={{ padding: 0}}>


				<div id="loading" />
				
	
	</Col>
			
</Row>
			
		);
	}
}


export default CandleChart;
