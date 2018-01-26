import React, { Component } from 'react';
import { Layout,
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
        Icon } from 'antd';
import { graphql } from 'react-apollo';
import IcoByName from './query/IcoByName';
import m from 'moment';
import n from 'numeral';
import { Timeline } from 'react-twitter-widgets';

const { Content } = Layout;
const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
  }

class IcoProfile extends Component { 

    CreateRating(props) {
        if ( props > 3.9 ) {
           return <font color='green'>{props}</font>
        } else if ( props < 2 ) { 
            return <font color='red'>{props}</font>
        } else {
            return <font color='blue'>{props}</font>
        }
    }

    CountExperts(props) {
        const CountRatings = props.length;
        if ( CountRatings !== null || undefined ) {
        return <span className="ico-rating-experts">{CountRatings} Expert Ratings</span>;
        } else {
            return <span className="ico-rating-experts"> 0 Expert Ratings</span>;
        }
    }

    CreateTags(props) {

        const Values = Object.values(props);
        
        const Store = [];

        Values.forEach( item => {

            Store.push(`<Tag className="ico-tags">${item.name}</Tag>`);

        });

        return Store;
       
    }

    CreateVideo(props) {

    if ( props !== '' ) {    

        return ( 
            <Content className="ico-video-container">
            <Col className="ico-video-asset">
            <center>
            <iframe width="560" height="315" src={props} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
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
            <Button type="primary" ghost>Please Review</Button>
            {' '}<Divider type="vertical" />{' '}
            <Button type="danger" ghost>Shitcoin, NTY</Button>

            </center>

            </Col>
        
        </Content>
        
        );
    }

    }

    CreateDates(props) {
        
        const CheckTime = m(props).format('l');

        if ( props !== '0000-00-00 00:00:00' || null ) {
        
            return <span className="ico-profile-date">{CheckTime}</span>;

        } else {

            return <Tag color="volcano">UNKNOWN</Tag>;

        }
    }

    CreateExchanges(props) {

        const CountExchanges = props.length;
        if ( CountExchanges > 0 ) {
         props.forEach( (item) => {   

            const MakeExchange = <Col><img src={item.logo} /></Col>;
            return MakeExchange;
                
            
            })
        }
    }

   CreateTeamList(props) {
      if ( props.team !== null ) { 
        return (
            <List
            grid={{ gutter: 10, column: 2}}
            dataSource={props.team}
            renderItem={item => (
                <List.Item>
                <List.Item.Meta
                avatar={<Avatar src={item.photo} />}
                title={<a href={item.links}>{item.name} <Divider type="vertical" /> {item.title}</a>}
                description={`Score: ${item.iss}`}
                />
            </List.Item>
            )}
        />
        )
    } else {
        return  <Content className="ico-video-container">
        <Col className="ico-video-asset">
        <center>
        <h1 className="ico-video-message">Team Coming Soon</h1>
        <Button type="primary" ghost>Please Notify</Button>
        {' '}<Divider type="vertical" />{' '}
        <Button type="danger" ghost>Not Interested</Button>
        </center>
        </Col>
        </Content>;
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
                <strong>Product: </strong>{item.product}<Divider type="vertical" />
              </Col>

              <Col>
               <strong>Team: </strong> {item.team}<Divider type="vertical" />
              </Col>

              <Col>
               <strong>Profile:</strong> {item.profile}<Divider type="vertical" />
              </Col>

              <Col>
               <strong>Vision:</strong> {item.vision}<Divider type="vertical" />
              </Col>
  
        </List.Item>
            )}
        />
    )
}

    CreateTwitter(props) {

    const CheckHTTPS = props.links.twitter.includes("https");

    const CheckHTTP = props.links.twitter.includes("http");
        
    if ( CheckHTTPS !== false ) {
       
        const Format = props.links.twitter.split("https://twitter.com/").join("");
       
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
        )
    } else if ( CheckHTTP !== false ) {
       
        const Format = props.links.twitter.split("http://twitter.com/").join("");
        
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
            />  )
    
    } else {
            return (
        <Col className="ico-video-asset">
        <center>
        <h3 className="ico-video-message"><Icon type="twitter" fontSize={24}/> Not Available</h3>
        </center>
        </Col>
            )
        }
    }

    CreateExchangeList(props) {

    if ( props.exchanges !== null || undefined ) {
        return (
            <List
            itemLayout="horizontal"
            dataSource={props.exchanges}
            renderItem={item => (
    
            <List.Item>
    
              <List.Item.Meta
                  key={item.id}
                  avatar={ <Tooltip 
                    key={item.id + '-' + 'name'} 
                  title={item.name} >  
                  <Avatar src={item.logo} />
                </Tooltip>}
                  title={<strong>{item.name}</strong>}                  
                  />
              <Col>
            
                  <strong>PRICE: </strong>{item.price} <strong>USD</strong><Divider type="vertical" />
                
                </Col>
    
              <Col>

                   <strong>ROI: </strong> {item.roi}<Divider type="vertical" />
                  
                 </Col>
    
            </List.Item>
                )}
            />
        )
    } else {
        return  <Content className="ico-video-container">
        <Col className="ico-video-asset">
        <center>
        <h1 className="ico-video-message">Exchanges Coming Soon</h1>
        <Button type="primary" ghost>Please Notify</Button>
        {' '}<Divider type="vertical" />{' '}
        <Button type="danger" ghost>Not Interested</Button>
        </center>
        </Col>
        </Content>;
    }
    
    }

    CreateMilestoneList(props) {

        if ( props.milestones !== null ) {

        return (
            <List
            dataSource={props.milestones}
            renderItem={item => (
                <List.Item>
                <List.Item.Meta
                  key={item.id}
                  title={ <strong>{item.title}</strong> }
                  description={item.content}
                />
              </List.Item>
            )}
          />
        )
    } else {
        return   <Content className="ico-video-container">
        <Col className="ico-video-asset">
        <center>
        <h1 className="ico-video-message">No Current Milestones</h1>
        <Button type="primary" ghost>Please Notify</Button>
        {' '}<Divider type="vertical" />{' '}
        <Button type="danger" ghost>Not Interested</Button>
        </center>
        </Col>
        </Content>
    }
    }

    CreateTeamImages(props) {

    if ( props.team !== null ) {

       return  props.team.map( (item) => {
            
            const MakeTeam = <Col span={4}>
        
            <Tooltip key={item.id + '-' + 'tooltip'} title={item.name + ': ' + item.title}>
        
            <img key={item.id + '-' + 'image'} className="ico-exchange-image" src={item.photo} />
        
            </Tooltip>
        
            </Col>;

            return ( MakeTeam );

        });
        } else {

            return ( <Col className="ico-video-asset">
            <center>
            <h3 className="ico-video-message">Team Coming Soon</h3>
            <Button type="primary" ghost>Please Notify</Button>
            {' '}<Divider type="vertical" />{' '}
            <Button type="danger" ghost>Not Interested</Button>
            </center>
            </Col> );

        }
    }

    CreateExchangeImages(props) {

        if ( props.exchanges !== null ) {

       return props.exchanges.map( (item) => {   
                     
            const MakeExchange = <Col span={4}>
        
            <Tooltip key={item.id + '-' + 'name'} title={item.name}>    
        
            <img key={item.id + '-' + 'image'} className="ico-exchange-image" src={item.logo} />
        
            </Tooltip>
        
            </Col>;
            
            return MakeExchange;
            });
        } else {
            return  <Col className="ico-video-asset">
            <center>
            <h3 className="ico-video-message">Exchanges Coming Soon</h3>
            <Button type="primary" ghost>Please Notify</Button>
            {' '}<Divider type="vertical" />{' '}
            <Button type="danger" ghost>Not Interested</Button>
            </center>
            </Col>;
        }
    }

    CreateMarkup() {
        const rawMarkup = this.props.data.ico_byName.about;
        const format = rawMarkup.split("<strong>").join("<p></br><strong>");
        const reformat = format.split("</strong>").join("</strong></p>");
        console.log(reformat);
        return {__html: reformat };
    }

    render() {

        if ( this.props.data.loading ) {
            
            return (
            
            <div className="example">    
                  <Spin tip="HOLD YOUR UNICORNS! IT'S LOADING!">
      
                    </Spin>
                    </div>
                  );
        
        } else {
            console.log(this.props);
        }

        return ( 
        
    <Layout className="profile-container" style={{margin: 20}}>

        <Row span={24}>
    
            <Col span={12} push={1}>
            
            <Row className="profile-header" >
                <Col span={4} className="ico-image">
                
                <img  className="ico-profile-logo" src={this.props.data.ico_byName.logo} />
                
                </Col>
                
                
                <Col span={18}>
                
                <Row className="ico-name">
                
                <span className="header-profile">{this.props.data.ico_byName.name}</span>

                </Row>


                <Row className="ico-tagline">

                <span className="header-tagline">{this.props.data.ico_byName.tagline}</span>

                </Row>

                </Col>

                </Row>


                <Row span={12} className="ico-information">

                { this.props.data.ico_byName.intro }

                </Row>

                <Row>
            
                {this.props.data.ico_byName.categories.map((item) => {
                    const CreateTag = <Tag key={item.id} className="ico-tags">{item.name}</Tag>;
                    return CreateTag;
                  })}

                </Row>

                <Row>

                {this.CreateVideo(this.props.data.ico_byName.links.youtube)}

                </Row>

                </Col>

                <Col span={12}>

                <Row span={24}>

                <Col span={16} push={7} className="stat-box" style={{padding: 10}}>
            
                <Row> 
            
                <span className="ico-rating-main">{this.CreateRating(this.props.data.ico_byName.rating)}</span>
            
                {this.CountExperts(this.props.data.ico_byName.ratings)}
            
                <Divider />
            
                </Row>

                <Row span={16} type="flex" justify="center">
            
                <Col span={5}>
            
                <span className="ico-rating-item">
            
                  {this.props.data.ico_byName.ratingProduct}
            
                    </span>
            
                  <span className="ico-rating-field">
            
                  PRODUCT
            
                  </span>
              
                </Col>
             
                <Col span={5}>

                <span className="ico-rating-item">
              
                {this.props.data.ico_byName.ratingProfile}
              
                </span>
              
              <span className="ico-rating-field">
              
              PROFILE
              
              </span>
              
              </Col>
                
                <Col span={5}>

                <span className="ico-rating-item">
              
                {this.props.data.ico_byName.ratingTeam}
              
                </span>

              <span className="ico-rating-field">
              
              TEAM
              
                  </span>
              
              </Col>
                
                <Col span={5}>

                <span className="ico-rating-item">
              
                {this.props.data.ico_byName.ratingVision}
              
                </span>

              <span className="ico-rating-field">
              
              VISION
              
              </span>
                
              </Col>
                
                </Row>
                
                <Divider />
            
                    <Row span={10}>
        
                        <Col span={12}>
    
                            <span className="ico-date">{this.CreateDates(this.props.data.ico_byName.dates.preIcoStart)}</span>
        
                            <span className="ico-rating-experts">PRE-ICO START</span>
        
                        </Col>
                    
                        <Col span={12}>
        
                        <span className="ico-date">{this.CreateDates(this.props.data.ico_byName.dates.preIcoEnd)}</span>
        
                        <span className="ico-rating-experts">PRE-ICO END</span>
            
                        </Col>
                
                    </Row>
                
                    <Divider />
                
                    <Row span={10}>
            
                        <Col span={12}>
        
                            <span className="ico-date">{this.CreateDates(this.props.data.ico_byName.dates.icoStart)}</span>
        
                            <span className="ico-rating-experts">START DATE</span>
            
                        </Col>
                    
                        <Col span={12}>
            
                        <span className="ico-date">{this.CreateDates(this.props.data.ico_byName.dates.icoEnd)}</span>
            
                        <span className="ico-rating-experts">END DATE</span>
                
                        </Col>
                    
                    </Row>
                    
                    <Divider />

                    <Row type="flex" justify="center">
                
                { this.CreateExchangeImages(this.props.data.ico_byName) }
                
                </Row>
                
                <Divider />
                
                <Row type="flex" justify="center">
                  
                {this.CreateTeamImages(this.props.data.ico_byName)}
                </Row>
            </Col>

        </Row>

 </Col>

            </Row>
            
            <Row span={24} type="flex"  className="profile-container-bottom">
            
                <Content style={{background: '#fff'}}>

                    <Col className="bottom-details" span={12} push={1} style={{ padding: 0, margin: 0 }}>
                
                    <Tabs defaultActiveKey="about" onChange={callback}>
                    
                    <TabPane tab="About" key="about">
                    <h1><strong>About {this.props.data.ico_byName.name}</strong></h1>
                   
                        <div className="ico-about-page" dangerouslySetInnerHTML={this.CreateMarkup()} />
                   
                     </TabPane>
                    
                    <TabPane tab="Milestones" key="milestones">
                    
                  
                   {this.CreateMilestoneList(this.props.data.ico_byName)}
                  
                    
                    
                    </TabPane>
                    
                    <TabPane tab="Team" key="team">
                                        
                    {this.CreateTeamList(this.props.data.ico_byName)}
                    
                    </TabPane>
                    
                    <TabPane tab="Ratings" key="ratings">
                    {this.CreateRatingsList(this.props.data.ico_byName.ratings)}
                    </TabPane> 

                    <TabPane tab="Financials" key="finance">
                    
                    <Row>

                    <Col className="finanical-box">
        
                    <Row span={24}>
        
                        <Col span={12}>
        
                        <strong>Symbol: </strong>{' '}{this.props.data.ico_byName.finance.token}
        
                        </Col>
        
                        <Col span={12}>
        
                        <strong>Platform:</strong>{' '}{this.props.data.ico_byName.finance.platform}
        
                        </Col>
        
                        </Row>
        
                        <Divider />
        
                        <Row span={24}>
        
                        <Col span={12}>
        
                        <strong>Type: </strong>{' '}{this.props.data.ico_byName.finance.tokentype}
        
                        </Col>
        
                        <Col span={12}>
        
                        <strong>Accepting:</strong>{' '}{this.props.data.ico_byName.finance.accepting}
        
                        </Col>
        
                        </Row>
        
                        <Divider />
        
                        <Row span={24}>
        
                        <Col span={12}>
        
                        <strong>Total Tokens: </strong>{' '}{this.props.data.ico_byName.finance.tokens}
        
                        </Col>
        
                        <Col span={12}>
        
                        <strong>Distributed:</strong>{' '}{this.props.data.ico_byName.finance.distributed}
        
                        </Col>
        
                        </Row>

                        <Divider />


                        <Row span={24}>
        
                        <Col span={12}>
        
                        <strong>Softcap: </strong>{' '}{this.props.data.ico_byName.finance.softcap}
        
                        </Col>
        
                        <Col span={12}>
        
                        <strong>Hardcap:</strong>{' '}{this.props.data.ico_byName.finance.hardcap}
        
                        </Col>
        
                        </Row>
        
                        <Divider />
            
                    </Col>
                
                </Row>

                    <Row>
                    <h3><strong>Associated Exchanges with {this.props.data.ico_byName.name}</strong></h3>
                    {this.CreateExchangeList(this.props.data.ico_byName)}
                    </Row>
                    
                    </TabPane>

                    <TabPane tab="Links" key="links">
                    
                    <Row className="social-info" span={24}>

                    <Row>
                
                        <Col span={12}>

                        <strong><Icon type="twitter" style={{ fontSize: 20 }}/> 
                        <a href=
                        {this.props.data.ico_byName.links.twitter}>
                        {' '}Twitter
                        </a>
                        </strong>    
                        <Divider /> 
                        </Col>

                        <Col span={12}>

                        <strong><Icon type="facebook" style={{ fontSize: 20 }}/>
                        <a href=
                        {this.props.data.ico_byName.links.facebook}>
                        {' '}Facebook
                         </a>
                         </strong>    
                        <Divider /> 
                        </Col>
                   
                        
                    </Row>

                    <Row>
                
                    <Col span={12}>

                    <strong><Icon type="github" style={{ fontSize: 20 }}/> 
                    <a href=
                    {this.props.data.ico_byName.links.github}>
                    {' '}Github
                    </a>
                    </strong>    
                    <Divider /> 
                    </Col>

                    <Col span={12}>

                    <strong><Icon type="medium" style={{ fontSize: 20 }}/> 
                    <a href=
                    {this.props.data.ico_byName.links.medium}>
                    {' '}Medium
                    </a>
                    </strong>    
                    <Divider /> 
                    </Col>
               
                    
                </Row>

                <Row>
                
                <Col span={12}>

                <strong><Icon type="global" style={{ fontSize: 20 }}/> 
                <a href=
                {this.props.data.ico_byName.links.www}>
                {' '}Website
                </a>
                </strong>    
                <Divider /> 
                </Col>

                <Col span={12}>

                <strong><Icon type="file-text" style={{ fontSize: 20 }}/>
                <a href={this.props.data.ico_byName.links.whitepaper}>
                {' '}Whitepaper
                 </a>
                 </strong>   
                 <Divider /> 
                </Col>
           
                
                </Row>

                <Row>
                
                <Col span={12}>

                <strong><Icon type="telegram" style={{ fontSize: 20 }}/>
                <a href=
                {this.props.data.ico_byName.links.telegram}>
                {' '}Telegram
                </a>
                </strong>
                <Divider /> 
                </Col>

                <Col span={12}>

                <strong><Icon type="bitcoin" style={{ fontSize: 20 }}/>
                <a href=
                {this.props.data.ico_byName.links.bitcointalk}>
                {' '}Bitcointalk
                </a>
                </strong>
                <Divider /> 
                </Col>
                   
                <Row>
                
                <Col span={12}>

                <strong><Icon type="reddit" style={{ fontSize: 20 }}/> 
                <a href=
                {this.props.data.ico_byName.links.reddit}>
                {' '}Reddit
                </a></strong>   
                <Divider /> 
                </Col>

                <Col span={12}>

                <strong><Icon type="slack" style={{ fontSize: 20 }}/>
                <a href=
                {this.props.data.ico_byName.links.slack}> 
                {' '}Slack 
                </a>
                </strong>    
                <Divider /> 
                </Col>
           
                
            </Row>
                
            </Row>
                   
             </Row>

                    </TabPane>

                    </Tabs>

                    </Col>

                    <Col span={7} push={4} className="twitter-widget-holder" style={{margin:10, minHeight: 700, minWidth: 350}}>
                    <div className="twitter-header">
                    {this.CreateTwitter(this.props.data.ico_byName)}
                    </div>
                    </Col>

                    </Content>

            </Row>

        </Layout>
        
        );
    }
}

export default graphql(IcoByName, {
	options: (props) => { return {  variables: { symbol: props.match.params.id } } }
})(IcoProfile);
