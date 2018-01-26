import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout;

class ChartSide extends Component {
    
    render() {
        return ( 
            <Col span={6} >

	
            <Row>
            <Content style={{ background: '#fff', padding: 5, margin: 5, minHeight: 50 }}>
            
            </Content>
            </Row>
                    
                    
            <Row>

            <Content style={{ background: '#fff', padding: 5, margin: 5, minHeight: 50 }}>
            
            </Content>		

            </Row>
            
            <Row>

            <Content style={{ background: '#fff', padding: 5, margin: 5, minHeight: 50 }}>
            
            </Content>

            </Row>
            
    
            <Row>
            
            <Content style={{ background: '#fff', padding: 5, margin: 5, minHeight: 50 }}>
            
            </Content>

            </Row>


            <Row>
            
            <Content style={{ background: '#fff', padding: 0, margin: 5, minHeight: 190 }}>
            
            </Content>

            </Row>

            </Col>
        );
    }
}

export default ChartSide;