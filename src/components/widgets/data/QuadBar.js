import React, { Component } from 'react';
import { Layout, Row, Col, Divider, Tag } from 'antd';
import * as n from 'numeral';

const { Content } = Layout;

class QuadBar extends Component { 

    state = {
        margin: 17,
        span: 5
    }

    NumberColorHandler(props) {

        if ( props !== null ) {
     
            if ( props !== undefined ) {
    
            const itemName = props.toString();
    
            const checkStatus = itemName.includes("-");
    
                if ( checkStatus !== true ) {
    
                        return (<span className="stat-number"><font color="green">{props}</font> %</span>)
                
                    } else {
    
                    return (<span className="stat-number"><font color="red">{props}</font> %</span>);
                
                }
    
            } else { 
                
                return ( <span className="stat-number"><Tag color="volcano">UNKNOWN</Tag></span> ); 
                
            }
        }       
	}
    
    VolumeConvertDollar(props) {
		if ( props.details !== null || undefined ) {
		const number = n(props.details.volume);
		n.defaultFormat(`$0,0`);
		const reFormat = number.format();
		return (<span className="stat-number">{reFormat}</span>);
        }  else {
            return ( <span className="stat-number"><Tag color="volcano">UNKNOWN</Tag></span>);
        }
    }


	ConvertDollar(props) {
		const number = n(props);
		n.defaultFormat(`$0,0.00`);
		const reFormat = number.format();
		return (<span className="stat-number">{reFormat}</span>);
	}

	LargeConvertDollar(props) {
		if ( props !== null || undefined ) {
		const number = n(props);
		n.defaultFormat(`$0,0`);
		const reFormat = number.format();
		return (<span className="stat-number">{reFormat}</span>);
        }  else {
            return ( <span className="stat-number"><Tag color="volcano">UNKNOWN</Tag></span>);
        }
    }

    ConvertLargeNumber(props) {
        if ( props !== null || undefined ) {
        const number = n(props);
        n.defaultFormat(`0,0`);
        const reFormat = number.format();
        return ( <span className="stat-number">{reFormat}</span> );
        }  else {
            return ( <span className="stat-number"><Tag color="volcano">UNKNOWN</Tag></span>);
        }
    }

    ConvertSupply(props) {
        if ( props.total_supply !== null || undefined ) {
            const number = n(props.total_supply);
            n.defaultFormat(`0,0`);
            const reFormat = number.format();
            return ( <span className="stat-number">{reFormat}</span> );
        } else if ( props.max_supply !== null || undefined ) {
            const number = n(props.max_supply);
            n.defaultFormat(`0,0`);
            const reFormat = number.format();
            return ( <span className="stat-number">{reFormat}</span> );
        } else {
            return ( <span className="stat-number"><Tag color="volcano">UNKNOWN</Tag></span>);
        }
    }

    render() {

        
        return (
        <Layout> 
            <Row span={24} type="flex" justify="center">
            <Col span={this.state.span} 
            className="profile-stat-box-section" 
            style={{margin: this.state.margin}}>
                <Col span={14} style={{padding: 5}}>
                <span className="stat-title">PRICE <Divider type="vertical"/></span>
                </Col>

                <Col span={6}>
                    {this.ConvertDollar(this.props.data.data.coin_bySymbol.profile.price_usd)}
                </Col>

              </Col>
            
              <Col span={this.state.span} 
              className="profile-stat-box-section" 
              style={{margin: this.state.margin}}>
              <Col span={14} style={{padding: 5}}>
              <span className="stat-title">HOUR CHANGE <Divider type="vertical"/></span>
              </Col>

              <Col span={6}>
              {this.NumberColorHandler(this.props.data.data.coin_bySymbol.profile.percent_change_1h)}
              </Col>
                </Col>
                <Col span={this.state.span} 
                className="profile-stat-box-section" 
                style={{margin: this.state.margin}}>
                <Col span={14} style={{padding: 5}}>
                <span className="stat-title">24H CHANGE <Divider type="vertical"/></span>
                </Col>

                <Col span={6}>
                {this.NumberColorHandler(this.props.data.data.coin_bySymbol.profile.percent_change_24h)}
                </Col>
                </Col>
    
                <Col span={this.state.span} 
                className="profile-stat-box-section" 
                style={{margin: this.state.margin}} >
                <Col span={14} style={{padding: 5}}>
                <span className="stat-title">WEEK CHANGE <Divider type="vertical"/></span>
                </Col>

                <Col span={6}>
                {this.NumberColorHandler(this.props.data.data.coin_bySymbol.profile.percent_change_7d)}
                </Col>
                </Col>
                        
            </Row>
            <Row span={24} type="flex" justify="center">
            <Col span={this.state.span} 
            className="profile-stat-box-section" 
            style={{margin: this.state.margin}}>
                <Col span={14} style={{padding: 5}}>
                <span className="stat-title">VOLUME <Divider type="vertical"/></span>
                </Col>

                <Col span={6}>
                {this.VolumeConvertDollar(this.props.data.data.coin_bySymbol)}
                </Col>

              </Col>
            
              <Col span={this.state.span} 
              className="profile-stat-box-section" 
              style={{margin: this.state.margin}}>
              <Col span={14} style={{padding: 5}}>
              <span className="stat-title">MARKETCAP <Divider type="vertical"/></span>
              </Col>

              <Col span={6}>
              {this.LargeConvertDollar(this.props.data.data.coin_bySymbol.profile.market_cap_usd)}
              </Col>
                </Col>
                <Col span={this.state.span} 
                className="profile-stat-box-section" 
                style={{margin: this.state.margin}}>
                <Col span={14} style={{padding: 5}}>
                <span className="stat-title">CIRCULATING <Divider type="vertical"/></span>
                </Col>

                <Col span={6}>
                {this.ConvertLargeNumber(this.props.data.data.coin_bySymbol.profile.available_supply)}
                </Col>
                </Col>
    
                <Col span={this.state.span} 
                className="profile-stat-box-section" 
                style={{margin: this.state.margin}} >
                <Col span={14} style={{padding: 5}}>
                <span className="stat-title">TOTAL SUPPLY <Divider type="vertical"/></span>
                </Col>

                <Col span={6}>
                {this.ConvertSupply(this.props.data.data.coin_bySymbol.profile)}
                </Col>
                </Col>
                        
            </Row>
        </Layout>
        );
    }
}

export default QuadBar;