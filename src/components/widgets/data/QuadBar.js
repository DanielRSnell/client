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
		if ( props.coinCap !== null || undefined ) {
		const number = n(props.coinCap.volume);
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
        
        if ( props.total !== 0 ) {
        
            const number = n(props.total);
        
            n.defaultFormat(`0,0`);
        
            const reFormat = number.format();
        
            return (<Col span={this.state.span} 
                className="profile-stat-box-section" 
                style={{margin: this.state.margin}} >
                <Col span={14} style={{padding: 5}}>
                <span className="stat-title">TOTAL SUPPLY <Divider type="vertical"/></span>
                </Col>

                <Col span={6}>
                <span className="stat-number">{reFormat}</span>
                </Col>
                </Col>);
        
            } else if ( props.max !== 0 ) {
        
                const number = n(props.max);
        
                n.defaultFormat(`0,0`);
        
                const reFormat = number.format();
        
                return ( <Col span={this.state.span} 
        
                    className="profile-stat-box-section" 
        
                    style={{margin: this.state.margin}} >
        
                    <Col span={14} style={{padding: 5}}>
        
                    <span className="stat-title">MAX SUPPLY <Divider type="vertical"/></span>
        
                    </Col>

                <Col span={6}>
        
                <span className="stat-number">{reFormat}</span>
        
                </Col>
        
                </Col> );
        
            } else {
            return ( 
                <Col span={this.state.span} 
                className="profile-stat-box-section" 
                style={{margin: this.state.margin}} >
                <Col span={14} style={{padding: 5}}>
                <span className="stat-title">MAX SUPPLY <Divider type="vertical"/></span>
                </Col>

                <Col span={6}>
                <span className="stat-number"><Tag color="volcano">UNKNOWN</Tag></span>
                </Col>
                </Col>
                );
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
                    {this.ConvertDollar(this.props.data.data.allCoinProfiles[0].price)}
                </Col>

              </Col>
            
              <Col span={this.state.span} 
              className="profile-stat-box-section" 
              style={{margin: this.state.margin}}>
              <Col span={14} style={{padding: 5}}>
              <span className="stat-title">HOUR CHANGE <Divider type="vertical"/></span>
              </Col>

              <Col span={6}>
              {this.NumberColorHandler(this.props.data.data.allCoinProfiles[0].hour)}
              </Col>
                </Col>
                <Col span={this.state.span} 
                className="profile-stat-box-section" 
                style={{margin: this.state.margin}}>
                <Col span={14} style={{padding: 5}}>
                <span className="stat-title">24H CHANGE <Divider type="vertical"/></span>
                </Col>

                <Col span={6}>
                {this.NumberColorHandler(this.props.data.data.allCoinProfiles[0].day)}
                </Col>
                </Col>
    
                <Col span={this.state.span} 
                className="profile-stat-box-section" 
                style={{margin: this.state.margin}} >
                <Col span={14} style={{padding: 5}}>
                <span className="stat-title">WEEK CHANGE <Divider type="vertical"/></span>
                </Col>

                <Col span={6}>
                {this.NumberColorHandler(this.props.data.data.allCoinProfiles[0].week)}
                </Col>
                </Col>
                        
            </Row>
            
        </Layout>
        );
    }
}

export default QuadBar;