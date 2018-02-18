import React, { Component } from 'react';
import {
	Layout,
	Row,
	Col,
	Spin,
	Divider,
	Tag,
	Button,
	Tooltip,
	Tabs,
	Radio,
	List,
	Avatar,
	Rating,
	Icon
} from 'antd';
import { graphql } from 'react-apollo';
import IcoByName from './query/IcoByName';
import m from 'moment';
import n from 'numeral';
import { Timeline } from 'react-twitter-widgets';
import mixpanel from 'mixpanel-browser';
import MetaTags from 'react-meta-tags';

const { Content } = Layout;
const TabPane = Tabs.TabPane;

function callback(key) {
	console.log(key);
}

class IcoProfile extends Component {
	CreateRating(props) {
		if (props > 3.9) {
			return <font color="green">{props}</font>;
		} else if (props < 2) {
			return <font color="red">{props}</font>;
		} else {
			return <font color="blue">{props}</font>;
		}
	}

	InitMix() {
		console.log(`Mixpanel`);
		mixpanel.init('d7b8b0e988ae095fe996e068780eac11');
		mixpanel.track('Page View', { Page: 'ICO Page' });
	}

	CountExperts(props) {
		const CountRatings = props.length;
		if (CountRatings !== null || undefined) {
			return (
				<span className="ico-rating-experts">
					{CountRatings} Expert Ratings
				</span>
			);
		} else {
			return <span className="ico-rating-experts"> 0 Expert Ratings</span>;
		}
	}

	CreateTags(props) {
		const Values = Object.values(props);

		const Store = [];

		Values.forEach(item => {
			Store.push(`<Tag className="ico-tags">${item.name}</Tag>`);
		});

		return Store;
	}

	CreateVideo(props) {
		if (props !== null) {
			if (props.video !== null) {
				return (
					<Content className="ico-video-container">
						<Col className="ico-video-asset">
							<center>
								<iframe
									width="560"
									height="315"
									src={props.video}
									frameBorder="0"
									allow="autoplay; encrypted-media"
									allowFullScreen
								/>
							</center>
						</Col>
					</Content>
				);
			} else {
				return (
					<Content className="ico-video-container">
						<Col className="ico-video-asset">
							<center>
								<h1 className="ico-video-message">WOMP, VOTE FOR A VIDEO!</h1>
								<Button type="primary" ghost>
									Please Review
								</Button>{' '}
								<Divider type="vertical" />{' '}
								<Button type="danger" ghost>
									Shitcoin, NTY
								</Button>
							</center>
						</Col>
					</Content>
				);
			}
		} else {
			return (
				<Content className="ico-video-container">
					<Col className="ico-video-asset">
						<center>
							<h1 className="ico-video-message">WOMP, VOTE FOR A VIDEO!</h1>
							<Button type="primary" ghost>
								Please Review
							</Button>{' '}
							<Divider type="vertical" />{' '}
							<Button type="danger" ghost>
								Shitcoin, NTY
							</Button>
						</center>
					</Col>
				</Content>
			);
		}
	}

	CreateDates(props) {
		const CheckTime = m(props).format('l');

		if (props !== '0000-00-00 00:00:00' || null) {
			return <span className="ico-profile-date">{CheckTime}</span>;
		} else {
			return <Tag color="volcano">UNKNOWN</Tag>;
		}
	}

	CreateExchanges(props) {
		const CountExchanges = props.length;
		if (CountExchanges > 0) {
			props.forEach(item => {
				const MakeExchange = (
					<Col>
						<img src={item.logo} />
					</Col>
				);
				return MakeExchange;
			});
		}
	}

	CreateTeamList(props) {
		if (props !== null) {
			return (
				<List
					itemLayout="horizontal"
					dataSource={props}
					renderItem={item => (
						<List.Item>
							<List.Item.Meta
								avatar={<Avatar src={item.photo} />}
								title={
									<a href={item.links}>
										<Icon type="linkedin" /> {item.name}
									</a>
								}
								description={item.title}
							/>
							<Col>
								<strong>ISS: </strong>
								{item.iss}
							</Col>
						</List.Item>
					)}
				/>
			);
		} else {
			return (
				<Content className="ico-video-container">
					<Col className="ico-video-asset">
						<center>
							<h1 className="ico-video-message">Team Coming Soon</h1>
							<Button type="primary" ghost>
								Please Notify
							</Button>{' '}
							<Divider type="vertical" />{' '}
							<Button type="danger" ghost>
								Not Interested
							</Button>
						</center>
					</Col>
				</Content>
			);
		}
	}

	CreateRatingsList(props) {
		return (
			<List
				itemLayout="horizontal"
				dataSource={props}
				renderItem={item => (
					<List.Item>
						<List.Item.Meta
							avatar={<Avatar src={item.photo} />}
							title={`${item.name} - ${item.date}`}
							description={item.review}
						/>
						<Col>
							<strong>Product: </strong>
							{item.product}
							<Divider type="vertical" />
						</Col>

						<Col>
							<strong>Team: </strong> {item.team}
							<Divider type="vertical" />
						</Col>

						<Col>
							<strong>Profile:</strong> {item.profile}
							<Divider type="vertical" />
						</Col>

						<Col>
							<strong>Vision:</strong> {item.vision}
							<Divider type="vertical" />
						</Col>
					</List.Item>
				)}
			/>
		);
	}

	CreateTwitter(props) {
		if (props !== null) {
			const CheckHTTPS = props.twitter.includes('https');

			const CheckHTTP = props.twitter.includes('http');

			if (CheckHTTPS !== false) {
				const Format = props.twitter.split('https://twitter.com/').join('');

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
			} else if (CheckHTTP !== false) {
				const Format = props.twitter.split('http://twitter.com/').join('');

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
	}

	CreateExchangeList(props) {
		if (props.icoExchanges !== null || undefined) {
			return (
				<List
					itemLayout="horizontal"
					dataSource={props.icoExchanges}
					renderItem={item => (
						<List.Item>
							<List.Item.Meta
								key={item.id}
								avatar={
									<Tooltip key={item.id + '-' + 'name'} title={item.name}>
										<Avatar src={item.logo} />
									</Tooltip>
								}
								title={<strong>{item.name}</strong>}
							/>
							<Col>
								<strong>PRICE: </strong>
								{item.price} <strong>USD</strong>
								<Divider type="vertical" />
							</Col>

							<Col>
								<strong>ROI: </strong> {item.roi}
								<Divider type="vertical" />
							</Col>
						</List.Item>
					)}
				/>
			);
		} else {
			return (
				<Content className="ico-video-container">
					<Col className="ico-video-asset">
						<center>
							<h1 className="ico-video-message">Exchanges Coming Soon</h1>
							<Button type="primary" ghost>
								Please Notify
							</Button>{' '}
							<Divider type="vertical" />{' '}
							<Button type="danger" ghost>
								Not Interested
							</Button>
						</center>
					</Col>
				</Content>
			);
		}
	}

	CreateMilestoneList(props) {
		if (props.milestones !== null) {
			return (
				<List
					dataSource={props.milestones}
					renderItem={item => (
						<List.Item>
							<List.Item.Meta
								key={item.id}
								title={<strong>{item.title}</strong>}
								description={item.content}
							/>
						</List.Item>
					)}
				/>
			);
		} else {
			return (
				<Content className="ico-video-container">
					<Col className="ico-video-asset">
						<center>
							<h1 className="ico-video-message">No Current Milestones</h1>
							<Button type="primary" ghost>
								Please Notify
							</Button>{' '}
							<Divider type="vertical" />{' '}
							<Button type="danger" ghost>
								Not Interested
							</Button>
						</center>
					</Col>
				</Content>
			);
		}
	}

	CreateTeamImages(props) {
		if (props !== null) {
			if (props.icoTeams !== null) {
				return props.icoTeams.map(item => {
					const MakeTeam = (
						<Col span={4}>
							<Tooltip
								key={item.id + '-' + 'tooltip'}
								title={item.name + ': ' + item.title}>
								<img
									key={item.id + '-' + 'image'}
									className="ico-exchange-image"
									src={item.photo}
								/>
							</Tooltip>
						</Col>
					);

					return MakeTeam;
				});
			} else {
				return (
					<Col className="ico-video-asset">
						<center>
							<h3 className="ico-video-message">Team Coming Soon</h3>
							<Button type="primary" ghost>
								Please Notify
							</Button>{' '}
							<Divider type="vertical" />{' '}
							<Button type="danger" ghost>
								Not Interested
							</Button>
						</center>
					</Col>
				);
			}
		} else {
			return (
				<Col className="ico-video-asset">
					<center>
						<h3 className="ico-video-message">Team Coming Soon</h3>
						<Button type="primary" ghost>
							Please Notify
						</Button>{' '}
						<Divider type="vertical" />{' '}
						<Button type="danger" ghost>
							Not Interested
						</Button>
					</center>
				</Col>
			);
		}
	}

	CreateExchangeImages(props) {
		if (props.icoExchanges.length > 0) {
			return props.icoExchanges.map(item => {
				const MakeExchange = (
					<Col span={4}>
						<Tooltip key={item.id + '-' + 'name'} title={item.name}>
							<img
								key={item.id + '-' + 'image'}
								className="ico-exchange-image"
								src={item.logo}
							/>
						</Tooltip>
					</Col>
				);

				return MakeExchange;
			});
		} else {
			return (
				<Col className="ico-video-asset">
					<center>
						<h3 className="ico-video-message">Exchanges Coming Soon</h3>
						<Button type="primary" ghost>
							Please Notify
						</Button>{' '}
						<Divider type="vertical" />{' '}
						<Button type="danger" ghost>
							Not Interested
						</Button>
					</center>
				</Col>
			);
		}
	}

	CreateMarkup(props) {
		if (props.about !== null || undefined) {
			const raw = props.about.split('<br />').join('<br /> <br />');

			return { __html: raw };
		} else {
			const raw = '<h3>There is no content available</h3>';

			return { __html: raw };
		}
	}

	render() {
		console.log(this.props.data);

		const data = this.props.data.IcoProfile;

		return (
			<div>
				{!data && (
					<div className="example">
						<Spin tip="HOLD YOUR UNICORNS! IT'S LOADING!" />
					</div>
				)}
				{data && (
					<Layout className="profile-container" style={{ margin: 20 }}>
						{this.InitMix()}

						<MetaTags>
							<title>Hackcoin | {data.name} ico information</title>
							<meta
								id="meta-description"
								name="description"
								content={`Learn more about ${data.name} ico, ${data.tagline}`}
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

						<Row span={24}>
							<Col span={12} push={1}>
								<Row className="profile-header">
									<Col span={4} className="ico-image">
										<img className="ico-profile-logo" src={data.logo} />
									</Col>

									<Col span={18}>
										<Row className="ico-name">
											<span className="header-profile">{data.name}</span>
										</Row>

										<Row className="ico-tagline">
											<span className="header-tagline">{data.tagline}</span>
										</Row>
									</Col>
								</Row>

								<Row span={12} className="ico-information">
									{data.intro}
								</Row>

								<Row>
									{data.icoCategories.map(item => {
										const CreateTag = (
											<Tag key={item.id} className="ico-tags">
												{item.name}
											</Tag>
										);
										return CreateTag;
									})}
								</Row>

								<Row>{this.CreateVideo(data.icoLinks)}</Row>
							</Col>

							<Col span={12}>
								<Row span={24}>
									<Col
										span={16}
										push={7}
										className="stat-box"
										style={{ padding: 10 }}>
										<Row>
											<span className="ico-rating-main">
												{this.CreateRating(data.rating)}
											</span>

											{this.CountExperts(data.icoRatings)}

											<Divider />
										</Row>

										<Row span={16} type="flex" justify="center">
											<Col span={5}>
												<span className="ico-rating-item">
													{data.ratingProduct}
												</span>

												<span className="ico-rating-field">PRODUCT</span>
											</Col>

											<Col span={5}>
												<span className="ico-rating-item">
													{data.ratingProfile}
												</span>

												<span className="ico-rating-field">PROFILE</span>
											</Col>

											<Col span={5}>
												<span className="ico-rating-item">
													{data.ratingTeam}
												</span>

												<span className="ico-rating-field">TEAM</span>
											</Col>

											<Col span={5}>
												<span className="ico-rating-item">
													{data.ratingVision}
												</span>

												<span className="ico-rating-field">VISION</span>
											</Col>
										</Row>

										<Divider />

										<Row span={10}>
											<Col span={12}>
												<span className="ico-date">
													{this.CreateDates(data.prestart)}
												</span>

												<span className="ico-rating-experts">
													PRE-ICO START
												</span>
											</Col>

											<Col span={12}>
												<span className="ico-date">
													{this.CreateDates(data.preend)}
												</span>

												<span className="ico-rating-experts">PRE-ICO END</span>
											</Col>
										</Row>

										<Divider />

										<Row span={10}>
											<Col span={12}>
												<span className="ico-date">
													{this.CreateDates(data.start)}
												</span>

												<span className="ico-rating-experts">START DATE</span>
											</Col>

											<Col span={12}>
												<span className="ico-date">
													{this.CreateDates(data.end)}
												</span>

												<span className="ico-rating-experts">END DATE</span>
											</Col>
										</Row>

										<Divider />

										<Row type="flex" justify="center">
											{this.CreateExchangeImages(data)}
										</Row>

										<Divider />

										<Row type="flex" justify="center">
											{this.CreateTeamImages(data)}
										</Row>
									</Col>
								</Row>
							</Col>
						</Row>

						<Row span={24} type="flex" className="profile-container-bottom">
							<Content style={{ background: '#fff' }}>
								<Col
									className="bottom-details"
									span={12}
									push={1}
									style={{ padding: 0, margin: 0 }}>
									<Tabs defaultActiveKey="about" onChange={callback}>
										<TabPane tab="About" key="about">
											<h1>
												<strong>About {data.name}</strong>
											</h1>
											<Divider />
											<div
												className="ico-about-page"
												dangerouslySetInnerHTML={this.CreateMarkup(data)}
											/>

											<Divider />
										</TabPane>

										<TabPane tab="Milestones" key="milestones">
											{this.CreateMilestoneList(data)}
										</TabPane>

										<TabPane tab="Team" key="team">
											{this.CreateTeamList(data.icoTeams)}
										</TabPane>

										<TabPane tab="Ratings" key="ratings">
											{this.CreateRatingsList(data.icoRatings)}
										</TabPane>

										<TabPane tab="Financials" key="finance">
											{!data.icoFinance}
											{data.icoFinance && (
												<Row>
													<Col className="finanical-box">
														<Row span={24}>
															<Col span={12}>
																<strong>Symbol: </strong>{' '}
																{data.icoFinance.token}
															</Col>

															<Col span={12}>
																<strong>Platform:</strong>{' '}
																{data.icoFinance.platform}
															</Col>
														</Row>

														<Divider />

														<Row span={24}>
															<Col span={12}>
																<strong>Type: </strong>{' '}
																{data.icoFinance.tokentype}
															</Col>

															<Col span={12}>
																<strong>Accepting:</strong>{' '}
																{data.icoFinance.accepting}
															</Col>
														</Row>

														<Divider />

														<Row span={24}>
															<Col span={12}>
																<strong>Total Tokens: </strong>{' '}
																{data.icoFinance.tokens}
															</Col>

															<Col span={12}>
																<strong>Distributed:</strong>{' '}
																{data.icoFinance.distributed}
															</Col>
														</Row>

														<Divider />

														<Row span={24}>
															<Col span={12}>
																<strong>Softcap: </strong>{' '}
																{data.icoFinance.softcap}
															</Col>

															<Col span={12}>
																<strong>Hardcap:</strong>{' '}
																{data.icoFinance.hardcap}
															</Col>
														</Row>

														<Divider />
													</Col>
												</Row>
											)}
											<Row>
												<h3>
													<strong>Associated Exchanges with {data.name}</strong>
												</h3>
												{this.CreateExchangeList(data)}
											</Row>
										</TabPane>

										<TabPane tab="Links" key="links">
											{!data.icoLinks}
											{data.icoLinks && (
												<Row className="social-info" span={24}>
													{!data.icoLinks.twitter && !data.icoLinks.facebook}
													{data.icoLinks.twitter &&
														data.icoLinks.facebook && (
															<Row>
																<Col span={12}>
																	<strong>
																		<Icon
																			type="twitter"
																			style={{ fontSize: 20 }}
																		/>
																		<a href={data.icoLinks.twitter}> Twitter</a>
																	</strong>
																	<Divider />
																</Col>

																<Col span={12}>
																	<strong>
																		<Icon
																			type="facebook"
																			style={{ fontSize: 20 }}
																		/>
																		<a href={data.icoLinks.facebook}>
																			{' '}
																			Facebook
																		</a>
																	</strong>
																	<Divider />
																</Col>
															</Row>
														)}
													<Row>
														<Col span={12}>
															<strong>
																<Icon type="github" style={{ fontSize: 20 }} />
																<a href={data.icoLinks.github}> Github</a>
															</strong>
															<Divider />
														</Col>

														<Col span={12}>
															<strong>
																<Icon type="medium" style={{ fontSize: 20 }} />
																<a href={data.icoLinks.medium}> Medium</a>
															</strong>
															<Divider />
														</Col>
													</Row>

													<Row>
														<Col span={12}>
															<strong>
																<Icon type="global" style={{ fontSize: 20 }} />
																<a href={data.icoLinks.www}> Website</a>
															</strong>
															<Divider />
														</Col>

														<Col span={12}>
															<strong>
																<Icon
																	type="file-text"
																	style={{ fontSize: 20 }}
																/>
																<a href={data.icoLinks.whitepaper}>
																	{' '}
																	Whitepaper
																</a>
															</strong>
															<Divider />
														</Col>
													</Row>

													<Row>
														<Col span={12}>
															<strong>
																<Icon
																	type="telegram"
																	style={{ fontSize: 20 }}
																/>
																<a href={data.icoLinks.telegram}> Telegram</a>
															</strong>
															<Divider />
														</Col>

														<Col span={12}>
															<strong>
																<Icon type="bitcoin" style={{ fontSize: 20 }} />
																<a href={data.icoLinks.bitcointalk}>
																	{' '}
																	Bitcointalk
																</a>
															</strong>
															<Divider />
														</Col>

														<Row>
															<Col span={12}>
																<strong>
																	<Icon
																		type="reddit"
																		style={{ fontSize: 20 }}
																	/>
																	<a href={data.icoLinks.reddit}> Reddit</a>
																</strong>
																<Divider />
															</Col>

															<Col span={12}>
																<strong>
																	<Icon type="slack" style={{ fontSize: 20 }} />
																	<a href={data.icoLinks.slack}> Slack</a>
																</strong>
																<Divider />
															</Col>
														</Row>
													</Row>
												</Row>
											)}
										</TabPane>
									</Tabs>
								</Col>

								<Col
									span={7}
									push={4}
									className="twitter-widget-holder"
									style={{ margin: 10, minHeight: 700, minWidth: 350 }}>
									<div className="twitter-header">
										{this.CreateTwitter(data.icoLinks)}
									</div>
								</Col>
							</Content>
						</Row>
					</Layout>
				)}
			</div>
		);
	}
}

export default graphql(IcoByName, {
	options: props => {
		return { variables: { symbol: props.match.params.id } };
	}
})(IcoProfile);
