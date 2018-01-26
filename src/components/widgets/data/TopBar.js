import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';

const { Content } = Layout; 

class TopBar extends Component { 

    render() {


        return (
            <Row span={24} style={{margin: 10}}>
					<Col span={12}>
					<Content style={{ background: '#fff', padding: 5, margin: 5, minHeight: 50 }}>

					</Content>
				
				</Col>
				
			</Row>
        );
    }
}

export default TopBar;