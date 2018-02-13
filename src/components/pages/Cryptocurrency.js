import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Layout, Row, Col, Spin, Divider, Tabs, Icon, Table } from 'antd';
import CoinBySymbol from './query/CoinBySymbol';
import CandleChart from '../widgets/charts/CandleStick';
import TopBar from '../widgets/data/TopBar';
import QuadBar from '../widgets/data/QuadBar'; 
import { Timeline } from 'react-twitter-widgets';
import TradingViewWidget from 'react-tradingview-widget';

    const TabPane = Tabs.TabPane;

    function callback(key) {
        
        console.log(key);
      }

    class Cryptocurrency extends Component {

        state = { 
            loading: true,
            data: null,
         }
        
        toggle = (value) => {
        
        this.setState({ loading: value });
    }

    CreateSubheader(props) {

        return (<span><strong>SYMBOL</strong> - {props.symbol}</span>);
    
    }

    componentDidMount() {
        
        
    }


    CreateMarkup(props) {

    if ( props.comparePage !== null ) {

        if ( props.comparePage.desc !== null ) { 
        
        const rawMarkup = this.props.data.allCoinProfiles[0].comparePage.desc;
        
        const format = rawMarkup.split("<strong>").join("<p></br><strong>");
        
        const reformat = format.split("</strong>").join("</strong></p>");
        
        return {__html: reformat };
      
    } else {

        
            const rawMarkup = "<h3>No content added, would you like to add?</h3>";

            return { __html: rawMarkup} ;

        }
    } else {

        const rawMarkup = "<h3>No content added, would you like to add?</h3>";

        return { __html: rawMarkup };

    }
}


CreateTwitter(props) {

        if ( props.allCoinProfiles[0].comparePage !== null ) {

        if ( props.allCoinProfiles[0].comparePage.twitter !== null ) {

            const check = props.allCoinProfiles[0].comparePage.twitter.includes("@");
            const Format = props.allCoinProfiles[0].comparePage.twitter.split("@").join("");

        if ( check === true ) {

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
                /> ) 
        
            } else {
                return ( <Col className="ico-video-asset">
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
    } else {

        return ( <Col className="ico-video-asset">
                    <center>
                    <h3 className="ico-video-message"><Icon type="twitter" fontSize={24}/> Not Available</h3>
                    </center>
                    </Col> );

    }
}


    MountImage(props) {
        return <img className="coin-profile-image" src={
            `https://files.coinmarketcap.com/static/img/coins/64x64/${this.props.data.allCoinProfiles[0].cmc}.png`
    } />;
    }

    CreateExchangeList(props) {

        const Columns = [{
            title: 'NAME',
            dataIndex: 'exchange',
            key: 'exchange',
        }, {
            title: 'HIGH',
            dataIndex: 'high',
            key: 'high',
        }, {
            title: 'LOW',
            dataIndex: 'low',
            key: 'low',
        }, {
            title: 'CURRENT',
            dataIndex: 'price',
            key: 'price'
        }]

        if ( props.compareExchangeses.length > 0 ) {

            const data = props.compareExchangeses;

            return (
                <Col className="profile-coin-bottom" span={22} push={1} style={{padding: 20}}>
                <Table 
                size="small"
                bordered={true}
                indentSize={20}
                dataSource={data} 
                columns={Columns} 
                rowKey={ (item) => item.exid}
                />
                
                </Col>

            );

        }

    }

    CreateFinanceData(props) {
        console.log(props);

        return ( <span>Something</span> );
    }
    
    CheckNullString(props) {
        if (props === "") {
          return "Unknown";
        } else if (props === " ") {
          return "Unknown";
        } else if (props === undefined) {
          return "Unknown";
        } else if (props === "undefined") {
          return "Unknown";
        } else if (props === null) {
          return "Unknown";
        } else {
          return props;
        }
      };

    CheckSymbol(props, currency) {
        if (props === "") {
          return "Unknown";
        } else if (props === " ") {
          return "Unknown";
        } else if (props === undefined) {
          return "Unknown";
        } else if (props === "undefined") {
          return "Unknown";
        } else if (props === null) {
          return "Unknown";
        } else {
        if (props === "BTC" ) {
          return 'BTCUSD';
        } else {
            return `${props}BTC`;
        }
      }
    }

    render() {    

        const data = this.props.data.allCoinProfiles;

        return (
            <div>
            {!data && <h1>Loading...</h1>}
            {data && data.map( item => (
            <Layout className="container">
            <Row span={24}  style={{margin: 10}}>
            <Col span={22} push={1} style={{ padding: 0}}>
            <Col span={2}>
            {this.MountImage(this.props.data)}
            </Col>
            <Col span={12}>
            <Row>
            <span className="coin-profile-header">{this.props.data.allCoinProfiles[0].name}</span>
            </Row>
            <Row>
            <span className="coin-profile-subheader">{this.CreateSubheader(this.props.data.allCoinProfiles[0])}</span>
            </Row>
            </Col>
            </Col>
            </Row>

            <Row span={24} type="flex" justify="center" style={{margin: 10}}>

            <Col className="profile-stat-box-section" span={22} style={{ padding: 0}}>

            <Col style={{margin: 0, padding: 0}}>
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
                ${this.CheckSymbol(this.props.data.allCoinProfiles[0].symbol, "BTC")}`
            }
            />
            </TabPane>
            </Tabs>

            </Col>

            </Col>

            </Row>
                <QuadBar data={this.props} />

                <Row span={24} justify="center" style={{margin: 10}}>
                <Row>
                <Col className="profile-coin-bottom" span={22} push={1}>

                    <Col className="profile-about-section" span={12} push={1}>
                    <Tabs>
                    <TabPane tab="ABOUT" key="1">
                    <span className="profile-about-content">
                    <h1><strong>About</strong> :{' '}{this.props.data.allCoinProfiles[0].name}</h1>
                    </span>

                    <div className="ico-about-page" dangerouslySetInnerHTML={this.CreateMarkup(this.props.data.allCoinProfiles[0])} />
                    
                    </TabPane>
                    
                    <TabPane tab="FINANCIAL" key="4">
                    
                    {this.CreateFinanceData(this.props.data.allCoinProfiles[0])}
                    
                    </TabPane>
                    
                    </Tabs>
                    
                    <Divider />
                    
                    </Col>

                    
                    <Col span={7} push={3} className="twitter-widget-holder" style={{margin:10, minHeight: 700, minWidth: 350}}>
                    <div className="twitter-header">
                    {this.CreateTwitter(this.props.data)}
                    </div>
                    </Col>

                    </Col>
                    </Row>
                    <Row span={24} justify="center" style={{margin: 10, padding: 0}}>
                    
                        {this.CreateExchangeList(item)}
                    
                    </Row>
                    
                </Row>

            </Layout>
        ))}
        </div>
        )
    }
}

export default graphql(CoinBySymbol, {
	options: (props) => { return {  variables: { symbol: props.match.params.id } } }
})(Cryptocurrency);
