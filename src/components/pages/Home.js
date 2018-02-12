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

  CheckMarketCap(props) {


    if ( props.global !== undefined ) {

      return this.ConvertDollar(props.global.marketcap);

      } else {
       
        return "Loading....";
        
      }

  }

  CheckDom(props) {


    if ( props.global !== undefined ) {

      return props.global.dom;

      } else {
       
        return "Loading....";
        
      }

  }


  CheckVolume(props) {


    if ( props.global !== undefined ) {

      return this.ConvertDollar(props.global.volume);

      } else {
       
        return "Loading....";
        
      }

  }

    render() { 

      const data = this.props.coins;
      const glob = this.props.coins.global;
      
       return (
    <div>
      {!glob && <Row>
        <CoinsRanked data={this.props} loading={false} />
      </Row>}
      {glob && 
       <Content style={{margin: 10}}>
          <Row span={24} type="flex" className="filter-home">
          <Col span={5} style={{margin: 10}}>
          <Content className="home-global-item" style={{ padding: 0, margin: 5, minHeight: 48 }}>
              <strong>TOTAL MARKETCAP:</strong> {
              
                this.CheckMarketCap(this.props.coins)
              
              }
            </Content>
            </Col>
            <Col span={5}  style={{margin: 10}}>
          <Content className="home-global-item" style={{ padding: 0, margin: 5, minHeight: 48 }}>
            <strong>DAILY VOLUME:</strong> {
            
              this.CheckVolume(this.props.coins)
            
            }
            </Content>
            </Col>
            <Col span={5} style={{margin: 10}}>
          <Content className="home-global-item" style={{ padding: 0, margin: 5, minHeight: 48 }}>
            <strong>BITCOIN DOMINANCE:</strong> {this.CheckDom(this.props.coins)}%
            </Content>
            </Col>
            <Col span={5} push={4} style={{margin: 10}}>
            <SearchInput className="search-input" data={this.props} placeholder="Search Your Coins" style={{ width: 215 }} />
              </Col>
          </Row>
          <Row>
            <CoinsRanked data={this.props} loading={false} />
          </Row>
        </Content>
          }
      </div> 
      );
    }
}


const query = gql`
query Home {
  allCoinProfiles( 
  orderBy: rank_ASC
  ) {
    id
    rank
    cmc
    name
		symbol
    price
    hour
    day
    week
    marketcap
    coinCap {
      volume
    }
    coinImage {
      image32
    }
  }
  global {
    marketcap
    volume
    dom
  }
}
`;

export default graphql(query, {name: 'coins' })(Home);