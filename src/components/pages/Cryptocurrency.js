import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { Layout, Row, Col, Spin, Alert, Divider, Tabs, Icon } from 'antd';
import CoinBySymbol from './query/CoinBySymbol';
import CandleChart from '../widgets/charts/CandleStick';
import TopBar from '../widgets/data/TopBar';
import QuadBar from '../widgets/data/QuadBar'; 
import { Timeline } from 'react-twitter-widgets';

    const { Content } = Layout;

    const TabPane = Tabs.TabPane;

    function callback(key) {
        console.log(key);
      }

    class Cryptocurrency extends Component {

        state = { loading: true }
        
        toggle = (value) => {
        
        this.setState({ loading: value });
    }

    CreateSubheader(props) {
        return (<span><strong>SYMBOL</strong> - {props.profile.symbol}</span>);
    }


    CreateMarkup(props) {
        if ( this.props.data.coin_byProfile !== null || undefined ) { 
        const rawMarkup = this.props.data.coin_byProfile.snapshot.General.Description;
        const format = rawMarkup.split("<strong>").join("<p></br><strong>");
        const reformat = format.split("</strong>").join("</strong></p>");
        
        return {__html: reformat };
        } else {
            const rawMarkup = '<h3>No content added, would you like to add?</h3></br>';
        }
    }

    CreateSocialTabs(props) {
        
       if ( props !== null || undefined ) {  
        if ( props.Twitter.link && props.Reddit.link !== null ) {
        } else if ( props.Twitter.link !== false ) {
            this.CreateTwitter(props);
        } else if ( props.Reddit.link !== false ) {
        } else {
        }
    }
}

CreateTwitter(props) {
  if ( props.coin_byProfile !== null || undefined ) {
   if ( props.coin_byProfile.social.Twitter.link !== null ) { 
    const CheckHTTPS = props.coin_byProfile.social.Twitter.link.includes("https");

    const CheckHTTP = props.coin_byProfile.social.Twitter.link.includes("http");
        
    if ( CheckHTTPS !== false ) {
       
        const Format = props.coin_byProfile.social.Twitter.link.split("https://twitter.com/").join("");
       
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
       
        const Format = props.coin_byProfile.social.Twitter.link.split("http://twitter.com/").join("");
        
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
    } else {
        return (
            <Col className="ico-video-asset">
            <center>
            <h3 className="ico-video-message"><Icon type="twitter" fontSize={24}/> Not Available</h3>
            </center>
            </Col> );
        }
    } else {
        return ( <Col className="ico-video-asset">
            <center>
            <h3 className="ico-video-message"><Icon type="twitter" fontSize={24}/> Not Available</h3>
            </center>
            </Col> );
    }
}


    MountImage(props) {
        if ( props.coin_byProfile !== null || undefined ) {

        return <img className="coin-profile-image" src={`https://www.cryptocompare.com${this.props.data.coin_byProfile.profile.ImageUrl}`} />;
            
        } else {

            return <img className="coin-profile-image" src={`https://files.coinmarketcap.com/static/img/coins/32x32/${this.props.data.coin_bySymbol.profile.id}.png`} />;

        }
    }

    render() {    

        		
		if ( this.props.data.loading ) {
			return (
        <div className="example">    
            <Spin tip="HOLD YOUR UNICORNS! IT'S LOADING!">

              </Spin>
              </div>
            );
		}


        return (
            <Layout className="container">
            <Row span={24} style={{margin: 10}}>
            <Col span={2}>
            {this.MountImage(this.props.data)}
            </Col>
            <Col span={12}>
            <Row>
            <span className="coin-profile-header">{this.props.data.coin_bySymbol.profile.name}</span>
            </Row>
            <Row>
            <span className="coin-profile-subheader">{this.CreateSubheader(this.props.data.coin_bySymbol)}</span>
            </Row>
            </Col>
            </Row>
                    <CandleChart coins={this.props} />
                <QuadBar data={this.props} />

                <Row span={24} type="flex" justify="center" style={{margin: 10}}>
                
                <Col className="profile-coin-bottom" span={22}>

                    <Col className="profile-about-section" span={12} push={1}>
                    <Divider />
                    <span className="profile-about-content">
                    <h1><strong>About</strong>{' '}<Divider type="vertical" />{' '}{this.props.data.coin_bySymbol.profile.name}</h1>
                    </span>

                    <div className="ico-about-page" dangerouslySetInnerHTML={this.CreateMarkup()} />
                    <Divider />
                    </Col>

                    
                    <Col span={7} push={3} className="twitter-widget-holder" style={{margin:10, minHeight: 700, minWidth: 350}}>
                    <div className="twitter-header">
                    {this.CreateTwitter(this.props.data)}
                    </div>
                    </Col>

                    </Col>

                </Row>
            </Layout>
        );
    }
}

export default graphql(CoinBySymbol, {
	options: (props) => { return {  variables: { symbol: props.match.params.id } } }
})(Cryptocurrency);
