import React, { Component } from 'react';
import { SearchBar, Button, WhiteSpace, WingBlank, Card } from 'antd-mobile';
import n from 'numeral';

class CoinList extends Component {
	state = {
		data: [],
		store: this.props.coins,
		value: ''
	};

	componentWillMount() {
		const data = this.state.store;

		const Values = [];

		data.forEach(item => {
			Values.push(item);
		});
		this.setState({ data: Values });
	}

	ConvertDollar(props) {
		if (props !== null || undefined) {
			const number = n(props);
			n.defaultFormat(`$0,0.00`);
			const reFormat = number.format();
			return reFormat;
		}
	}

	onChange(value, props) {
		console.log(value);
		console.log(this.state);

		const searchItem = value.toLowerCase();
		const Values = [];

		if (value !== '') {
			this.state.store.forEach(item => {
				const itemName = `${item.name}-${item.symbol}`;

				const check = itemName.toLowerCase().includes(searchItem);

				if (check === true) {
					Values.push(item);
				}
			});

			this.setState({ data: Values });
		} else {
			this.setState({ data: this.state.store });
		}
	}

	render() {
		console.log(this.props);
		return (
			<div className="mobile-container">
				<SearchBar
					placeholder="Search Coins"
					onChange={value => this.onChange(value, this.props)}
					cancelText="Cancel"
					onSubmit={value => console.log(value, 'onSubmit')}
					onClear={value => console.log(value, 'onClear')}
				/>
				<WhiteSpace />
				<WingBlank size="lg">
					<WhiteSpace size="lg" />
					{this.state.data.map(item => {
						const createitem = (
							<Card key={item.id}>
								<Card.Header
									title={<span>{item.name}</span>}
									thumb={`https://files.coinmarketcap.com/static/img/coins/32x32/${
										item.cmc
									}.png`}
									extra={`${this.ConvertDollar(item.price)}`}
								/>
							</Card>
						);
						return createitem;
					})}
					<WhiteSpace size="lg" />
				</WingBlank>
			</div>
		);
	}
}

export default CoinList;
