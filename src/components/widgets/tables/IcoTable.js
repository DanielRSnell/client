import React, { Component } from 'react';
import { Row, Table, Col, Layout, Tag, Select } from 'antd';
import n from 'numeral';
import m from 'moment';

const { Content } = Layout;
const { Column } = Table;

class IcoTable extends Component {
	state = {
		store: this.props.icos.ico_main.allIcoProfiles,
		data: []
	};

	componentWillMount() {
		this.PrepTable(this.props.icos.ico_main.allIcoProfiles);
	}

	PrepTable(props) {
		this.setState({ data: props });
	}

	ConvertDollar(props) {
		const number = n(props);
		n.defaultFormat(`$0,0`);
		const reFormat = number.format();
		return (
			<span>
				<strong>{reFormat}</strong>
			</span>
		);
	}

	rowClickHandler(name) {
		const replaceSpaces = name.replace(/\s+/g, '-').toLowerCase();
		this.props.icos.history.push('/ico/' + replaceSpaces);
	}

	render() {
		console.log(this.props);

		return (
			<Layout>
				<Row type="flex" justify="center" span={24}>
					<Col span={24} justify="center" type="flex">
						<Content
							style={{
								background: '#fff',
								padding: 0,
								margin: 0,
								minHeight: 280
							}}>
							<Table
								size="default"
								loading={this.state.loading}
								bordered={false}
								indentSize={20}
								pagination={{ pageSize: 100 }}
								dataSource={this.state.data}
								onRowClick={item => this.rowClickHandler(item.id)}
								rowKey={item => item.id}
								onChange={this.tableChange}>
								<Column
									key="rating"
									width={150}
									title={<strong>RATING</strong>}
									render={item => {
										if (item.rating <= 1.9 || null) {
											return (
												<Tag color="#f50" className="table-tag">
													{item.rating}
												</Tag>
											);
										} else if (item.rating > 3.9) {
											return (
												<Tag color="#87d068" className="table-tag">
													{item.rating}
												</Tag>
											);
										} else {
											return (
												<Tag color="#2db7f5" className="table-tag">
													{item.rating}
												</Tag>
											);
										}
									}}
								/>

								<Column
									key="logo"
									render={item => (
										<img className="table-image" src={item.logo} />
									)}
								/>

								<Column
									key="name"
									render={item => (
										<span>
											<h3>{item.name}</h3>
										</span>
									)}
								/>

								<Column
									title={<strong>PLATFORM</strong>}
									key="platform"
									render={item => {
										if (item.icoFinance !== null) {
											if (item.icoFinance.platform !== '') {
												return (
													<span className="table-text">
														{item.icoFinance.platform}
													</span>
												);
											} else {
												return <Tag color="volcano">UNKNOWN</Tag>;
											}
										} else {
											return <Tag color="volcano">UNKNOWN</Tag>;
										}
									}}
								/>

								<Column
									title={<strong>STATUS</strong>}
									key="status"
									render={item => {
										const CheckTime = m(item.end).fromNow();

										const InvalidTime = m(item.preend).fromNow();

										const CheckStart = m(item.prestart).fromNow();

										const CheckUnknown = CheckStart.includes('ago');

										if (CheckTime !== 'Invalid date') {
											const CheckFinished = CheckTime.includes('ago');

											if (CheckFinished === true) {
												return (
													<Tag color="#f50" className="table-tag">
														FINISHED
													</Tag>
												);
											} else {
												return (
													<Tag color="#87d068" className="table-tag">
														LIVE
													</Tag>
												);
											}
										} else if (InvalidTime !== 'Invalid date') {
											return (
												<Tag color="#2db7f5" className="table-tag">
													UPCOMING
												</Tag>
											);
										} else if (CheckUnknown === true) {
											return (
												<Tag color="#2db7f5" className="table-tag">
													UPCOMING
												</Tag>
											);
										} else {
											return <Tag color="volcano">UNKNOWN</Tag>;
										}
									}}
								/>
								<Column
									title={<strong>START</strong>}
									key="icoStart"
									render={item => {
										const CheckTime = m(item.start).fromNow();
										const InvalidTime = m(item.prestart).fromNow();

										const CheckTimeFormat = m(item.start).format('l');
										const InvalidTimeFormat = m(item.prestart).format('l');

										if (CheckTime !== 'Invalid date') {
											return (
												<span className="table-date">{CheckTimeFormat}</span>
											);
										} else if (InvalidTime !== 'Invalid date') {
											return (
												<span className="pre-start"> {InvalidTimeFormat}</span>
											);
										} else {
											return <Tag color="volcano">UNKNOWN</Tag>;
										}
									}}
								/>
								<Column
									title={<strong>END</strong>}
									key="icoEnd"
									render={item => {
										const CheckTime = m(item.end).fromNow();

										const InvalidTime = m(item.preend).fromNow();

										const CheckTimeFormat = m(item.end).format('l');

										const InvalidTimeFormat = m(item.preend).format('l');

										if (CheckTime !== 'Invalid date') {
											return (
												<span className="table-date">{CheckTimeFormat}</span>
											);
										} else if (InvalidTime !== 'Invalid date') {
											return (
												<span className="pre-start">{InvalidTimeFormat}</span>
											);
										} else {
											return <Tag color="volcano">UNKNOWN</Tag>;
										}
									}}
								/>
							</Table>
						</Content>
					</Col>
				</Row>
			</Layout>
		);
	}
}

export default IcoTable;
