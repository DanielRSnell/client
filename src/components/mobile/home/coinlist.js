import React, { Component } from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import n from 'numeral';

class CoinList extends Component {
	LargeConvertDollar(props) {
		if (props !== null || undefined) {
			const number = n(props);
			n.defaultFormat(`$0,0.00`);
			const reFormat = number.format();
			return { reFormat };
		}
	}

	render() {
		console.log(this.props);
		return (
			<div className="mobile-container">
				<WingBlank size="lg">
					<WhiteSpace size="lg" />
					{this.props.coins.map(item => {
						const number = n(item.price);
						n.defaultFormat(`$0,0.00`);
						const reFormat = number.format();

						const createitem = (
							<Card>
								<Card.Header
									title={<span>{item.name}</span>}
									thumb={`https://files.coinmarketcap.com/static/img/coins/32x32/${
										item.cmc
									}.png`}
									extra={`${reFormat}`}
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
