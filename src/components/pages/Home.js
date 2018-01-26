import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Select, Spin, Row, Col, Layout, Divider} from 'antd';
import CoinsRanked from '../widgets/tables/CoinsRanked';
import SearchInput from '../widgets/function/SearchInput';
import n from 'numeral';
import m from 'moment';

const Option = Select.Option;

const { Content } = Layout;

class Home extends Component {  
  
      toggle = (value) => {
      
      this.setState({ loading: value });
    }

    GetTime(props) {
      const reFormat = m.unix(props);
      const DateFormat = m(reFormat).format("lll");
      return DateFormat;
    }
 

    ConvertDollar(props) {
      const number = n(props);
      n.defaultFormat(`$0,0`);
      const reFormat = number.format();
      return (<span className="global-bar">{reFormat}</span>);
  }


    render() { 

      if ( this.props.coins.loading ) {
        return (
          <div className="example">    
              <Row span={24} type="flex" justify="center" className="home-headline-row">
            <Col span={12} className="home-headline-column">
            <center>
              <h1>WELCOME TO HACKCOIN</h1>
              <Divider />
              <span className="home-header-subtitle">
                WE PROVIDE AN <strong>AD FREE COMMUNITY</strong>, ALL DATA, <strong>NO BULLSHIT</strong>.
              </span>
              </center>
              </Col>  
            </Row> 
              <Spin tip="HOLD YOUR UNICORNS! IT'S LOADING!">
  
                </Spin>
                </div>
              );
      }

       return ( 
       <Content style={{margin: 10}}>
        <Row span={24} type="flex" justify="center" className="home-headline-row">
        <Col span={12} className="home-headline-column">
        <center>
          <h1>WELCOME TO HACKCOIN</h1>
          <Divider />
          <span className="home-header-subtitle">
            THE <strong>WORLD'S LARGEST</strong> CRYPTO GRAPHQL NETWORK.
          </span>
          </center>
          </Col>  
        </Row> 
          <Row span={20} type="flex" className="filter-home">
          <Col span={5} push={2} style={{margin: 10}}>
          <Content className="home-global-item" style={{ padding: 0, margin: 5, minHeight: 48 }}>
              <strong>TOTAL MARKETCAP:</strong> {this.ConvertDollar(this.props.coins.global.total_market_cap_usd)}
            </Content>
            </Col>
            <Col span={5} push={2} style={{margin: 10}}>
          <Content className="home-global-item" style={{ padding: 0, margin: 5, minHeight: 48 }}>
            <strong>DAILY VOLUME:</strong> {this.ConvertDollar(this.props.coins.global.total_24h_volume_usd)}
            </Content>
            </Col>
            <Col span={5} push={2} style={{margin: 10}}>
          <Content className="home-global-item" style={{ padding: 0, margin: 5, minHeight: 48 }}>
            <strong>BITCOIN DOMINANCE:</strong> {this.props.coins.global.bitcoin_percentage_of_market_cap}%
            </Content>
            </Col>
            <Col span={5} push={2} type="flex" justify="center" style={{margin: 10}}>
            <SearchInput className="search-input" data={this.props} placeholder="Search Your Coins" style={{ width: 215 }} />
              </Col>
          </Row>
          <Row>
            <CoinsRanked data={this.props} />
          </Row>
        </Content>
       );
    }
}


const query = gql`
{
  coins_rank{
    _rank
    id
    img
    name
    symbol
    price_usd
    percent_change_1h
    percent_change_24h
    percent_change_7d
    market_cap_usd
    volume
  }
  global{
    active_assets
    active_markets
    active_currencies
    bitcoin_percentage_of_market_cap
    last_updated
    total_24h_volume_usd
    total_market_cap_usd
  }
}
`;


export default graphql(query, {name: 'coins' })(Home);